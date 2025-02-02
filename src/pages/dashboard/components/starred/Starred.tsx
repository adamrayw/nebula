import { useEffect, useRef, useState } from "react";
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
import { apiRequest } from "@/api/apiService";

const Starred = () => {
  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const starredServiceUrl = import.meta.env.VITE_STARRED_SERVICE_URL;

  const { data, isLoading, isError, refetch } = useStarredFetchFile(
    search,
    offset
  );

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

  const handleRemoveStarred = useMutation({
    mutationFn: async (fileId: string) => {
      return await apiRequest(`delete`, starredServiceUrl, `/file/starred/${fileId}`);
    },
    onSuccess: () => {
      Promise.all([queryClient.invalidateQueries({
        queryKey: ["starredFiles"],
      })]);
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
                <TableCell>{moment(file.createdAt).format("LL")}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {file.starred !== null && (
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
    </div>
  );
};

export default Starred;
