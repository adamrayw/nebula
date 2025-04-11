import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/pages/core/components/design-system/ui/tabs";
import { LayoutGrid, Rows3 } from "lucide-react";
import { FaFolder } from "react-icons/fa";
import { useFetchFileFolders } from "@/queries/useFetchFiles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/pages/core/components/design-system/ui/table";
import moment from "moment";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import FileIcon from "../FileIcon";
import { IFolder } from "@/types/IFolder";
import DialogAddFolder from "../DIalogAddFolder";

const Folder = () => {
  const location = useLocation();
  const [folderHierarchy, setFolderHierarchy] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState<IFolder[] | null>(null);

  useEffect(() => {
    const subPath = location.pathname.replace("/dashboard/folders/", "");
    const pathSegments = subPath.split("/").filter(Boolean);
    setFolderHierarchy(pathSegments);
  }, [location.pathname]);

  const currentId = folderHierarchy[folderHierarchy.length - 1];

  const { data, isLoading, refetch } = useFetchFileFolders(
    currentId,
    !!currentId
  );

  useEffect(() => {
    if (currentId === "folders") {
      setCurrentFolder(data?.folders || null);
    } else if (currentId) {
      setCurrentFolder(data?.folderDetail?.files || null);
    }
  }, [refetch, data]);

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  return (
    <div className="px-10">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center space-x-2">
          <Link to={"/dashboard/folders"} className="flex items-center">
            <h1 className="text-2xl font-semibold mb-5">All Folders</h1>
          </Link>
          <h1 className="text-2xl font-semibold mb-5">
            {currentId === "folders" ? `` : "/ " + currentFolder?.name}
          </h1>
        </div>
        <DialogAddFolder parentFolderName={currentFolder} />
      </div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center"></div>
      </div>
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex flex-row-reverse justify-between">
          <div>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="grid">
                <LayoutGrid className="mr-2" size={16} />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <Rows3 className="mr-2" size={16} />
                List
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="grid" className="mt-10 rounded-lg h-screen">
          {location.pathname === "/dashboard/folders" ? (
            <div className="grid grid-cols-4 gap-6">
              {currentFolder && currentFolder.length > 0 ? (
                <>
                  {data?.folders?.map((folder: IFolder) => (
                    <Link
                      to={`/dashboard/folders/${folder.id}`}
                      key={folder.id}
                      className="p-6 rounded-lg flex flex-col items-center space-y-2 justify-center group hover:bg-blue-50 hover:text-gray-600 transition duration-300 ease-in-out hover:cursor-pointer "
                    >
                      <FaFolder
                        className="text-blue-500 group-hover:text-blue-600 transition duration-300 ease-in-out"
                        size={60}
                      />
                      <p>
                        <span className="text-sm font-semibold">
                          {folder.name}
                        </span>
                      </p>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500">No folders found</p>
                  <Link
                    to="/dashboard/folders"
                    className="text-blue-500 hover:underline mt-2"
                  >
                    Create a new folder
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              {(data?.files ?? []).length > 0 ? (
                <div className="grid grid-cols-4 gap-6">
                  {data?.folders?.map((folder) => (
                    <Link
                      to={`/dashboard/folders/${folder.id}`}
                      key={folder.id}
                      className="p-6 rounded-lg flex flex-col items-center space-y-2 justify-center group hover:bg-blue-50 hover:text-gray-600 transition duration-300 ease-in-out hover:cursor-pointer "
                    >
                      <FaFolder
                        className="text-blue-500 group-hover:text-blue-600 transition duration-300 ease-in-out"
                        size={60}
                      />
                      <p>
                        <span className="text-sm font-semibold">
                          {folder.name}
                        </span>
                      </p>
                    </Link>
                  ))}

                  {data?.files?.map((file) => (
                    <div
                      key={file.id}
                      className="flex flex-col justify-center items-center space-y-2"
                    >
                      <FileIcon size={10} url={file.originalName || ""} />
                      <p className="truncate max-w-64">{file.originalName}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No files found</p>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="list">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {location.pathname === "/dashboard/folders" ? (
                <>
                  {currentFolder && currentFolder.length > 0 ? (
                    <>
                      {data?.folderDetail?.map((folder: IFolder) => (
                        <TableRow
                          className="hover:bg-blue-50 hover:cursor-pointer"
                          key={folder.id}
                        >
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <FaFolder className="text-blue-500" size={20} />
                              <span>{folder.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span>
                              {moment(folder.createdAt).format("DD MMM YYYY")}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow className="hover:bg-blue-50 hover:cursor-pointer">
                      <TableCell colSpan={2} className="text-center">
                        No files found
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ) : (
                <>
                  {data?.files?.length === 0 && data?.folders?.length === 0 ? (
                    <TableRow className="hover:bg-blue-50 hover:cursor-pointer">
                      <TableCell colSpan={2} className="text-center">
                        No files found
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {data?.folders?.map((folder) => (
                        <TableRow
                          className="hover:bg-blue-50 hover:cursor-pointer"
                          key={folder.id}
                        >
                          <Link to={`/dashboard/folders/${folder.id}`}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <FaFolder className="text-blue-500" size={20} />
                                <span>{folder.name}</span>
                              </div>
                            </TableCell>
                          </Link>
                          <TableCell>
                            <span>
                              {moment(folder.createdAt).format("DD MMM YYYY")}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}

                      {data?.files?.map((file) => (
                        <TableRow
                          className="hover:bg-blue-50 hover:cursor-pointer"
                          key={file.id}
                        >
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <FileIcon
                                size={6}
                                url={file.originalName || ""}
                              />
                              <span>{file.originalName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span>
                              {moment(file.createdAt).format("DD MMM YYYY")}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Folder;
