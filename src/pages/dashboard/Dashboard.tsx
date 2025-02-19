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
import { Download, Ellipsis, Star, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../core/components/design-system/ui/popover";
import { Button } from "../core/components/design-system/ui/button";
import { useEffect, useRef, useState } from "react";
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
import { AxiosError } from "axios";
import { FaArrowDown, FaArrowUp, FaStar } from "react-icons/fa";
import CategoriesIndicator from "./components/CategoriesIndicator";
import { apiRequest } from "@/api/apiService";
import Notification from "../core/components/Notification";

const Dashboard = () => {
  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<string>("DESC");
  const queryClient = useQueryClient();
  const fileServiceUrl = import.meta.env.VITE_FILE_SERVICE_URL;
  const starredServiceUrl = import.meta.env.VITE_STARRED_SERVICE_URL;

  const isFirstRender = useRef({
    effect1: true,
    effect2: true,
  });

  const { data, isLoading, isError, refetch } = useFetchFile(
    search,
    offset,
    sortBy,
    sortOrder
  );

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
  }, [offset, sortBy, sortOrder]);

  useEffect(() => {
    if (isFirstRender.current.effect2) {
      isFirstRender.current.effect2 = false;
      return;
    }
    setOffset(0);
    refetch();
  }, [search]);

  const deleteHandler = useMutation({
    mutationFn: async (fileId: string) => {
      return await apiRequest(
        "delete",
        fileServiceUrl,
        "/file/deleteFile/" + fileId
      );
    },
    onSuccess: () => {
      Promise.all([queryClient.invalidateQueries()]);
      toast.success("File deleted Successfully", {
        position: "bottom-center",
        duration: 3000,
      });
    },
    onError: (error: AxiosError) => {
      toast.error("Failed to delete file, reason: " + error.message);
    },
  });

  const handleStarred = useMutation({
    mutationFn: async (fileId: string) => {
      return await apiRequest(
        `post`,
        starredServiceUrl,
        `/file/starred/${fileId}`
      );
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["files"],
        }),
      ]);
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const handleRemoveStarred = useMutation({
    mutationFn: async (fileId: string) => {
      return await apiRequest(
        `delete`,
        starredServiceUrl,
        `/file/starred/${fileId}`
      );
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["files"],
        }),
      ]);
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

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

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(column);
      setSortOrder("ASC");
    }
  };

  return (
    <div className="grid grid-cols-4 relative">
      <div className="col-span-4 border-r h-screen px-10">
        <div className="flex items-center justify-between ">
          <SearchBtn setSearch={setSearch} refetch={refetch} />
          <div className="notif">
            <Notification />
          </div>
          <div className="up-btn">
          {/* <h1 className="text-heading-3 !font-normal !text-gray-800 mb-4">
            Main Library
          </h1> */}
          <DialogUpload />
        </div>
        </div>
        <CategoriesIndicator />
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
                    <TableHead
                      onClick={() => handleSort("originalName")}
                      className="hover:cursor-pointer"
                    >
                      <div className="flex items-center">
                        Name
                        {sortBy === "originalName" && (
                          <span className="text-gray-400 ml-2">
                            {sortOrder === "ASC" ? (
                              <FaArrowUp />
                            ) : (
                              <FaArrowDown />
                            )}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("size")}
                      className="hover:cursor-pointer"
                    >
                      <div className="flex items-center">
                        Size
                        {sortBy === "size" && (
                          <span className="text-gray-400 ml-2">
                            {sortOrder === "ASC" ? (
                              <FaArrowUp />
                            ) : (
                              <FaArrowDown />
                            )}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("createdAt")}
                      className="hover:cursor-pointer"
                    >
                      <div className="flex items-center">
                        Uploaded on
                        {sortBy === "createdAt" && (
                          <span className="text-gray-400 ml-2">
                            {sortOrder === "ASC" ? (
                              <FaArrowUp />
                            ) : (
                              <FaArrowDown />
                            )}
                          </span>
                        )}
                      </div>
                    </TableHead>
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
                              <div className="flex items-center space-x-2">
                                <TableCell>
                                  <FileIcon url={file.originalName || ""} />
                                </TableCell>
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
                                  <p>Remove to Starred</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Star
                                    className="size-4 hover:cursor-pointer"
                                    onClick={() =>
                                      handleStarred.mutate(file.id)
                                    }
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Add to Starred</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}

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
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {isLoading && <p>Loading...</p>}
              {data?.data?.length === 0 && (
                <p className="text-center my-4 text-sm">
                  No files uploaded yet.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        {data?.data?.length !== 0 &&
          (data?.lastPage ?? 0) > 1 &&
          !isLoading && (
            <Pagination className="pb-10">
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
                        setOffset(
                          data?.lastPage ? data?.lastPage * 10 - 10 : 0
                        );
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
                          setOffset(
                            data?.lastPage ? data?.lastPage * 10 - 10 : 0
                          );
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
      </div>
      {/* <div className="px-4">Activity</div> */}
    </div>
  );
};

export default Dashboard;
