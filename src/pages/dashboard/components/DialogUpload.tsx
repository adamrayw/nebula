import { Button } from "@/pages/core/components/design-system/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/pages/core/components/design-system/ui/dialog";
import { Input } from "@/pages/core/components/design-system/ui/input";
import { Label } from "@/pages/core/components/design-system/ui/label";
import { Check, FileUp, UploadCloudIcon, X } from "lucide-react";
import { formatFileSize } from "../utils/formatFileSize";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileUploadProps, IFile } from "@/types/IFile";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { Progress } from "@/pages/core/components/design-system/ui/progress";
import toast from "react-hot-toast";
import { useGetUser } from "@/queries/useFetchUser";
import { uploadFile } from "@/api/uploadFile";
import FileIcon from "./FileIcon";
import validateExtension from "../utils/validateExtension";

interface ExtendedFile extends File {
  category: string;
  preview: string;
}

const DialogUpload = () => {
  const { register, handleSubmit, setValue, watch } = useForm<IFile>();
  const [progress, setProgress] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<FileUploadProps[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const loggedUser = useGetUser() as {
    data: { totalFileSize: number; limit: number };
  };
  const file = (watch("file") ?? [])[0] as ExtendedFile | undefined;
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : "";

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // Upload file by dragging and dropping
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);

    // Add preview URLs for image files
    const filesWithPreviews = await Promise.all(
      droppedFiles.map(async (file) => {
        // Validate file extension
        const checkExt = await validateExtension(file);

        // If file extension is not allowed, return undefined
        if (checkExt === undefined) {
          return;
        }

        // Add category to file object
        Object.assign(file, {
          category: await validateExtension(file),
        });

        // Add preview URL for image files
        if (file && file.type.startsWith("image/")) {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        }

        // Return file object without preview URL
        return file;
      })
    );

    // Filter out files that failed validation
    const validFiles = filesWithPreviews
      .filter((file): file is FileUploadProps => file !== undefined)

    // If there are valid files, add them to the list
    if (validFiles.length > 0) {
      setFiles((prev: FileUploadProps[]) => [...prev, ...validFiles]);
    }
  }, []);

  // Upload file by selecting from file dialog
  useEffect(() => {
    const getTypeFile = async () => {
      if ((file?.size || 0) > 10 * 1024 * 1024) {
        toast("File size maximum is 10MB", {
          position: "bottom-center",
          icon: "⚠️",
        });
        return;
      }

      const validationExt = await validateExtension(file);

      if (!validationExt) {
        return;
      }

      if (file) {
        file.category = validationExt;
      }

      // Add preview URLs for image files
      if (file && file.type.startsWith("image/")) {
        file.preview = URL.createObjectURL(file);
      }

      if (file) {
        setFiles((prev) => [...prev, file as unknown as FileUploadProps]);
      }
    };

    getTypeFile();
  }, [file]);

  // Mutation to upload file
  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      uploadFile("/file/uploadFile", {
        data,
        onUploadProgress: (progressEvent) => {
          const percentComplete = Math.round(
            progressEvent.total
              ? (progressEvent.loaded / progressEvent.total) * 100
              : 0
          );
          setProgress(percentComplete);
        },
      }),
    onSuccess: () => {
      Promise.all([queryClient.invalidateQueries()]);
      // toast.success("File Uploaded Successfully", {
      //   position: "bottom-center",
      //   duration: 3000,
      // });
    },
    onError: () => {
      toast.error("File Failed to Upload");
    },
  });

  const onSubmit = async () => {
    let totalUploadSize = 0;

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        toast("File size maximum is 10MB", {
          position: "bottom-center",
          icon: "⚠️",
        });
        continue;
      }

      totalUploadSize += file.size;

      if (
        totalUploadSize + (loggedUser?.data?.totalFileSize || 0) >
        loggedUser?.data?.limit
      ) {
        toast("Storage is not enough, upgrade to get more storage", {
          icon: "🗄️",
        });
        return;
      }

      const data = new FormData();
      data.append("file", file);
      data.append("userId", userId);
      data.append("originalSize", file.size.toString());
      data.append("category", file.category);

      try {
        await mutation.mutateAsync(data);
        Object.assign(file, { status: "success" });
        setProgress(0);
      } catch (error) {
        toast.error(`${file.name} failed to upload, reason: ${error}`, {
          icon: "📂",
        });
      }
    }
  };

  useEffect(() => {
    setFiles([]);
    setValue("file", new DataTransfer().files);
    setProgress(0);
    mutation.reset();
  }, [open]);

  const removeFile = useCallback((fileToRemove: File) => {
    setFiles((prev) => prev?.filter((file) => file !== fileToRemove));
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white">
          <FileUp />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[625px] w-[400px] sm:w-[800px] rounded-lg bg-white p-8 dark:bg-gray-950 max-h-[80vh] overflow-auto mx-auto sm:mx-auto md:mx-8 lg:mx-10">
        {/* <DialogContent className="sm:max-w-[425px]"> */}
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <div className="grid">
          <section className="mb-5">
            {files?.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Selected File: </p>
                <div className="space-y-2">
                  {files?.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg w-full max-w-full"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        {file?.preview ? (
                          <img
                            src={typeof file?.preview === 'string' ? file.preview : URL.createObjectURL(file.preview)}
                            alt={file?.name}
                            className="h-6 w-6 object-cover rounded"
                          />
                        ) : (
                          <FileIcon url={file?.name} />
                        )}
                        <div className="overflow-hidden min-w-0">
                          <p className="text-sm font-medium text-gray-700 truncate w-40 sm:w-80 md:w-96 lg:w-96 xl:w-96">
                            {file?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file?.size || 0)}
                          </p>
                        </div>
                      </div>
                      {file?.status === "success" ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <button
                          onClick={() => removeFile(file)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <X className="h-5 w-5 text-gray-500" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
          {!mutation.isPending && (
            <>
              {mutation.isSuccess ? (
                <>
                  <div className="bg-green-100 border border-green-300 text-green-900 px-4 py-2 rounded-lg text-sm">
                    File uploaded successfully
                  </div>
                  {mutation.isSuccess && (
                    <div className="flex items-end justify-end space-x-2 mt-4">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setFiles([]);
                          setProgress(0);
                          setOpen(false);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {files.length > 5 ? (
                    <div className="bg-red-100 border border-red-300 text-red-900 px-4 py-2 rounded-lg text-sm">
                      Maximum of 5 files can be uploaded at a time, upgrade to
                      unlimited uploads.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                      <Label htmlFor="file">
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`border border-dashed border-gray-300 rounded-lg cursor-pointer
                      ${
                        isDragging
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }
                      `}
                        >
                          <div className="flex flex-col py-10 px-4 items-center justify-between space-y-2">
                            <FileUp className="w-10 h-10" />
                            <span className="text-sm text-gray-500 text-center">
                              Browse your files or drag and drop here
                            </span>
                            <span className="text-xs text-gray-300">
                              Max file size: 10MB
                            </span>
                          </div>
                          <Input
                            className="hidden"
                            type="file"
                            id="file"
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.mp3,.mp4,.png,.jpg,.jpeg,.gif,.svg,.webp"
                            {...register("file", { required: true })}
                          />
                        </div>
                        {/* <p className="text-xs text-gray-300 font-normal mt-2 text-center">
                    pdf, doc, docx, ppt, pptx, xls, xlsx, mp3, mp4, png, jpg,
                    jpeg, gif, svg, webp
                  </p> */}
                        <p className="text-xs text-gray-300 font-normal mt-2 text-left">
                          Max 5 files can be uploaded at a time
                        </p>
                      </Label>
                      {!mutation.isPending && (
                        <div className="flex items-end justify-end space-x-2 mt-4">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setFiles([]);
                              setProgress(0);
                              setOpen(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button variant="outline" onClick={onSubmit}>
                            <UploadCloudIcon />
                            Upload
                          </Button>
                        </div>
                      )}
                    </form>
                  )}
                </>
              )}
            </>
          )}
          {mutation.isPending && (
            <div>
              <Progress value={progress} />
              {progress}%
            </div>
          )}
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpload;
