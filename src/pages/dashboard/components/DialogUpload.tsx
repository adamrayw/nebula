import { Button } from "@/pages/core/components/design-system/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/pages/core/components/design-system/ui/dialog";
import { Input } from "@/pages/core/components/design-system/ui/input";
import { Label } from "@/pages/core/components/design-system/ui/label";
import { FileUp, UploadCloudIcon } from "lucide-react";
import { formatFileSize } from "../utils/formatFileSize";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IFile } from "@/types/IFile";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Progress } from "@/pages/core/components/design-system/ui/progress";
import { fileTypeFromBlob } from "file-type";
import toast from "react-hot-toast";
import { useGetUser } from "@/queries/useFetchUser";
import { uploadFile } from "@/api/file";

const DialogUpload = () => {
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<IFile>();
  const [progress, setProgress] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [fileType, setFileType] = useState<string>("");
  const queryClient = useQueryClient();
  const loggedUser = useGetUser() as {
    data: { totalFileSize: number; limit: number };
  };

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
      toast.success("File Uploaded Successfully", {
        position: "bottom-center",
        duration: 3000,
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("File Failed to Upload");
    },
  });

  const files = watch("file") ? watch("file")[0] : null;

  const onSubmit = async () => {
    const data = new FormData();

    const allowedExtensions = new Set([
      "pdf",
      "doc",
      "docx",
      "ppt",
      "pptx",
      "xls",
      "xlsx",
      "mp3",
      "mp4",
      "png",
      "jpg",
      "jpeg",
      "gif",
      "svg",
      "webp",
    ]);

    if (files) {
      const fileType = await fileTypeFromBlob(files);

      let category = "";
      if (fileType && ["mp3"].includes(fileType.ext)) {
        category = "audio";
      } else if (
        fileType &&
        ["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(fileType.ext)
      ) {
        category = "image";
      } else if (fileType && ["mp4"].includes(fileType.ext)) {
        category = "video";
      } else if (
        fileType &&
        ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(
          fileType.ext
        )
      ) {
        category = "document";
      }

      data.append("category", category);

      if (!fileType || !allowedExtensions.has(fileType.ext)) {
        toast("Please upload a valid file type", {
          position: "bottom-center",
          icon: "⚠️",
        });
        return;
      }
    }

    if (files?.size) {
      if (files.size > 10 * 1024 * 1024) {
        toast("File size maximum is 10MB", {
          position: "bottom-center",
          icon: "⚠️",
        });
        return;
      }
      const checkForLimit = files?.size + loggedUser.data?.totalFileSize;

      if (checkForLimit > loggedUser.data?.limit) {
        toast("Storage is not enough, upgrade to get more storage", {
          icon: "🗄️",
        });
        return;
      }
    }

    if (files) {
      data.append("file", files);
    }

    const user = sessionStorage.getItem("user");
    const userId = user ? JSON.parse(user).id : "";

    data.append("userId", userId);
    data.append("originalSize", (files?.size ?? 0).toString());
    data.append("format", fileType);

    mutation.mutate(data);
  };

  useEffect(() => {
    setValue("file", new DataTransfer().files);
    setProgress(0);
  }, [open]);

  useEffect(() => {
    const getTypeFile = async () => {
      const file = getValues("file")[0];

      if (!file) {
        return;
      }

      const fileType = await fileTypeFromBlob(file);

      setFileType(fileType?.ext ?? "");
    };

    getTypeFile();
  }, [files]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white">
          <FileUp />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] w-[300px] sm:w-[400px] md:w-auto lg:w-auto rounded-lg bg-white p-8 dark:bg-gray-950 max-h-[80vh] overflow-auto mx-auto sm:mx-auto md:mx-8 lg:mx-10">
        {/* <DialogContent className="sm:max-w-[425px]"> */}
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Upload your files here to store them in the cloud.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {!files && (
              <Label htmlFor="file">
                <div className="border border-dashed border-gray-300 rounded-lg cursor-pointer">
                  <div className="flex flex-col py-10 px-4 items-center justify-between space-y-2">
                    <FileUp className="w-10 h-10" />
                    <span className="text-sm text-gray-500">
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
                <p className="text-xs text-gray-300 font-normal mt-2 text-center">
                  pdf, doc, docx, ppt, pptx, xls, xlsx, mp3, mp4, png, jpg,
                  jpeg, gif, svg, webp
                </p>
              </Label>
            )}
            {files && (
              <>
                <table>
                  <tr>
                    <td>Name</td>
                    <td>
                      <p className="truncate max-w-64">: {files?.name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Size</td>
                    <td>
                      :{" "}
                      {files?.size !== undefined
                        ? formatFileSize(files.size)
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>
                      <div className="flex">: {fileType}</div>
                    </td>
                  </tr>
                </table>
                {!mutation.isPending && (
                  <div className="flex items-end justify-end space-x-2 mt-4">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setValue("file", new DataTransfer().files);
                        setProgress(0);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="outline">
                      <UploadCloudIcon />
                      Upload
                    </Button>
                  </div>
                )}
              </>
            )}
          </form>
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
