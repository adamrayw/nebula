import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa";
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
import { post, remove } from "@/api/starred";
import { formatFileSize } from "../../utils/formatFileSize";
import SearchBtn from "../../components/SearchBtn";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/pages/core/components/design-system/ui/pagination";
import { IFile } from "@/types/IFile";
import { useStarredFetchFile } from "@/queries/useFetchStarredFiles";
import DocViewer, { DocViewerRenderers, PDFRenderer } from "react-doc-viewer";
// import { pdfjs } from "react-pdf";

// Atur Worker untuk PDF.js agar bekerja di Vite
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

const Starred = () => {
  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<IFile | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useStarredFetchFile(
    search,
    offset
  );

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch files");
    }
  }, [isError]);

  useEffect(() => {
    refetch();
  }, [refetch, offset]);

  useEffect(() => {
    setOffset(0);
    refetch();
  }, [search]);

  const handleStarred = useMutation({
    mutationFn: async (fileId: string) => {
      return await post(`/file/starred/${fileId}`);
    },
    onSuccess: () => {
      Promise.all([queryClient.invalidateQueries()]);
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const handleRemoveStarred = useMutation({
    mutationFn: async (fileId: string) => {
      return await remove(`/file/starred/${fileId}`);
    },
    onSuccess: () => {
      Promise.all([queryClient.invalidateQueries()]);
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (data?.data.length === 0) {
      if (data?.data?.length > 10) {
        setOffset(offset - 10);
        setPage(page - 1);
      } else {
        setOffset(0);
        setPage(1);
      }
    }
  }, [handleRemoveStarred]);

  const handlePrevious = () => {
    if (offset <= 0) return;
    setOffset(offset - 10);
    setPage(page - 1);
  };

  const handleNext = () => {
    if (page === data?.lastPage) return;
    setOffset(offset + 10);
    setPage(page + 1);
  };

  const handleFileClick = (file: IFile) => {
    console.log("PDF URL:", file.location); //Debugging url pdf
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
                <TableCell>
                  <div className="flex items-center">
                    {file.starred !== null ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <FaStar
                              className="size-4 hover:cursor-pointer text-yellow-400"
                              onClick={() =>
                                handleRemoveStarred.mutate(file.id)
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove from Starred</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Star
                              className="size-4 hover:cursor-pointer"
                              onClick={() => handleStarred.mutate(file.id)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to Starred</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && <p>Loading...</p>}
        {data?.data?.length === 0 && (
          <p className="text-center my-4 text-sm">No starred files found. </p>
        )}
      </div>

      {data?.data?.length !== 0 && (data?.lastPage ?? 0) > 1 && !isLoading && (
        <Pagination className="pb-10 mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePrevious()}
                className={`${
                  page === 1
                    ? "hover:cursor-pointer hover:bg-white"
                    : "hover:cursor-pointer"
                }`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                isActive={page === 1}
                onClick={() => {
                  setOffset(0);
                  setPage(1);
                }}
                className="hover:cursor-pointer"
              >
                1
              </PaginationLink>
            </PaginationItem>
            {(data?.lastPage ?? 0) > 1 && (data?.lastPage ?? 0) < 3 && (
              <PaginationItem>
                <PaginationLink
                  isActive={page === data?.lastPage}
                  onClick={() => {
                    setOffset(data?.lastPage ? data?.lastPage * 10 - 10 : 0);
                    setPage(data?.lastPage || 1);
                  }}
                  className="hover:cursor-pointer"
                >
                  {data?.lastPage}
                </PaginationLink>
              </PaginationItem>
            )}
            {(data?.lastPage ?? 0) > 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === data?.lastPage}
                    onClick={() => {
                      setOffset(data?.lastPage ? data?.lastPage * 10 - 10 : 0);
                      setPage(data?.lastPage || 1);
                    }}
                    className="hover:cursor-pointer"
                  >
                    {data?.lastPage}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => handleNext()}
                className={`${
                  page === data?.lastPage
                    ? "hover:cursor-pointer hover:bg-white"
                    : "hover:cursor-pointer"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

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

export default Starred;
