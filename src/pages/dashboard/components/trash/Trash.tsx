import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/pages/core/components/design-system/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/pages/core/components/design-system/ui/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import FileIcon from "../FileIcon";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { formatFileSize } from "../../utils/formatFileSize";
import SearchBtn from "../SearchBtn";
import { IFile } from "@/types/IFile";
import DocViewer, { DocViewerRenderers, PDFRenderer } from "react-doc-viewer";
// import { pdfjs } from "react-pdf";

// Atur Worker untuk PDF.js agar bekerja di Vite
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();
import { apiRequest } from "@/api/apiService";
import { useFetchTrash } from "@/queries/useFetchFiles";
import { Undo } from "lucide-react";
import { Button } from "@/pages/core/components/design-system/ui/button";
import DialogDeletePermanent from "../DIalogDeletePermanent";

const Trash = () => {
  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<IFile | null>(null);
  const queryClient = useQueryClient();
  const fileServiceUrl = import.meta.env.VITE_FILE_SERVICE_URL;

  const { data, isLoading, isError, refetch } = useFetchTrash();

  const isFirstRender = useRef({
    effect1: true,
    effect2: true,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch files");
    }
  }, [isError]);

  useEffect(() => {
    if (isFirstRender.current.effect1) {
      isFirstRender.current.effect1 = false;
      return;
    }
    refetch();
  }, [refetch, offset]);

  useEffect(() => {
    if (isFirstRender.current.effect2) {
      isFirstRender.current.effect2 = false;
      return;
    }
    setOffset(0);
    refetch();
  }, [search]);

  const undoTrash = useMutation({
    mutationFn: async (fileId: string) => {
      return await apiRequest(
        `put`,
        fileServiceUrl,
        `/file/undoTrash/${fileId}`
      );
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["trash"],
        }),
      ]);
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  // const deleteHandler = useMutation({
  //   mutationFn: async (fileId: string) => {
  //     return await apiRequest(
  //       "delete",
  //       fileServiceUrl,
  //       `/file/deleteFile/${fileId}?offset=${offset}&type=delete`
  //     );
  //   },
  //   onSuccess: () => {
  //     Promise.all([queryClient.invalidateQueries({
  //       queryKey: ["trash"],
  //     })]);
  //     toast.success("File deleted Successfully", {
  //       position: "bottom-center",
  //       duration: 3000,
  //     });
  //   },
  //   onError: (error: AxiosError) => {
  //     toast.error("Failed to delete file, reason: " + error.message);
  //   },
  // });

  const handleFileClick = (file: IFile) => {
    setSelectedFile(file);
  };

  return (
    <div className="px-10">
      <SearchBtn setSearch={setSearch} refetch={refetch} />
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>File size</TableHead>
              <TableHead>Uploaded on</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((file: IFile) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium truncate max-w-64">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="flex items-center space-x-2 hover:cursor-pointer"
                          onClick={() => handleFileClick(file)}
                        >
                          <FileIcon url={file.originalName || ""} />
                          <p className="truncate max-w-64">
                            {file.originalName}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{file.originalName}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{formatFileSize(file.size ?? 0)}</TableCell>
                <TableCell>{moment(file.createdAt).format("LL")}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => undoTrash.mutate(file.id)}
                    className="text-red-500"
                  >
                    <Undo size={24} />
                    Undo
                  </Button>
                  <DialogDeletePermanent fileId={file.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && <p>Loading...</p>}
        {data?.data?.length === 0 && (
          <p className="text-center my-4 text-sm">No files found in trash</p>
        )}
      </div>

      {/* Modal untuk menampilkan detail file */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-11/12 max-w-4xl">
            <h2 className="text-xl font-bold mb-4">
              {selectedFile.originalName}
            </h2>
            <div className="mb-4">
              <p>Size: {formatFileSize(selectedFile.size ?? 0)}</p>
              <p>Uploaded on: {moment(selectedFile.createdAt).format("LL")}</p>
            </div>
            <div className="h-96">
              <DocViewer
                documents={[
                  {
                    uri: selectedFile.location || "",
                    fileType: selectedFile.mimeType,
                  },
                ]}
                pluginRenderers={[...DocViewerRenderers, PDFRenderer]}
                config={{
                  header: {
                    disableHeader: false,
                    disableFileName: false,
                    retainURLParams: false,
                  },
                }}
                // onError={(e) => console.error("DocViewer viewer:", e)}
              />
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trash;
