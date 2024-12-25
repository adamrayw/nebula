import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../core/components/design-system/ui/tabs";
import SearchBtn from "./components/SearchBtn";
import DialogUpload from "./components/DialogUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../core/components/design-system/ui/table";
import { formatFileSize } from "./utils/formatFileSize";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../core/components/design-system/ui/tooltip";
import moment from "moment";
import FileIcon from "./components/FileIcon";
import { IFile } from "@/types/IFile";
import { Download, Ellipsis, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../core/components/design-system/ui/popover";
import { Button } from "../core/components/design-system/ui/button";
import { useEffect, useState } from "react";
import { deleteFile } from "@/api/deleteFile";
import toast from "react-hot-toast";
import { useFetchFile } from "@/queries/useFetchFiles";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../core/components/design-system/ui/pagination";

const Dashboard = () => {
  const [search, setSearch] = useState<string>("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useFetchFile(search);

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  const deleteHandler = useMutation({
    mutationFn: async (fileId: string) => {
      deleteFile({ fileId });
    },
    onSuccess: () => {
      Promise.all([queryClient.invalidateQueries()]);
      toast.success("File deleted Successfully", {
        position: "bottom-center",
        duration: 3000,
      });
    },
    onError: () => {
      toast.error("File Failed to delete");
    },
  });

  if (isError) {
    toast.error("Failed to fetch files");
  }

  return (
    <div className="grid grid-cols-4 relative">
      <div className="col-span-3 border-r h-screen px-10">
        <SearchBtn setSearch={setSearch} refetch={refetch} />
        <div className="up-btn fixed right-0 bottom-0 p-4 z-40">
          {/* <h1 className="text-heading-3 !font-normal !text-gray-800 mb-4">
            Main Library
          </h1> */}
          <DialogUpload />
        </div>
        <Tabs defaultValue="files" className="mt-10">
          <TabsList>
            <TabsTrigger value="files" className="tab">
              Files
            </TabsTrigger>
          </TabsList>
          <TabsContent value="files">
            <div className="my-5">
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
                  {data?.map((file: IFile) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium truncate max-w-64">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center space-x-2">
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
                      <TableCell>
                        {moment(file.createdAt).format("LL")}
                      </TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost">
                              <Ellipsis />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-2" asChild>
                            <div className="flex flex-col space-y-2 justify-start items-start">
                              <Button
                                variant="ghost"
                                asChild
                                className="w-full fex justify-start"
                              >
                                <a href={file.location}>
                                  <Download />
                                  Download
                                </a>
                              </Button>
                              <Button
                                variant="ghost"
                                className="text-red-500 hover:text-red-700 w-full fex justify-start"
                                onClick={() => {
                                  deleteHandler.mutate(file.id);
                                }}
                              >
                                <Trash />
                                Delete
                              </Button>
                              {/* <Button variant="ghost">Delete</Button> */}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {isLoading && <p>Loading...</p>}
              {data?.length === 0 && (
                <p className="text-center my-4 text-sm">
                  No files uploaded yet.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="px-4">Activity</div>
    </div>
  );
};

export default Dashboard;
