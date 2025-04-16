import { apiRequest } from "@/api/apiService";
import { Button } from "@/pages/core/components/design-system/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/pages/core/components/design-system/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArchiveX } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const DialogDeletePermanent = ({
  fileId,
}: {
  fileId: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const fileServiceUrl = import.meta.env.VITE_FILE_SERVICE_URL;
  const queryClient = useQueryClient();

  const deleteHandler = useMutation({
    mutationFn: async (fileId: string) => {
      return await apiRequest(
        "delete",
        fileServiceUrl,
        `/file/deleteFile/${fileId}?&type=delete`
      );
    },
    onSuccess: () => {
      Promise.all([queryClient.invalidateQueries()]);
      toast.success("File deleted permanently", {
        position: "bottom-center",
        duration: 3000,
      });
      setOpen(false);
    },
    onError: (error: AxiosError) => {
      toast.error("Failed to delete file, reason: " + error.message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-red-500 hover:text-red-700 w-fit flex justify-start"
        >
          <ArchiveX />
          Delete
        </Button>
      </DialogTrigger>
      {/* <DialogContent> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="sr-only">Confirm Delete</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <p className="text-center text-base py-8">
            Are you sure you want to delete this file permanently? This action
            cannot be undone.
          </p>
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={deleteHandler.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            type="submit"
            onClick={() => deleteHandler.mutate(fileId)}
            disabled={deleteHandler.isPending}
            className=""
          >
            <ArchiveX size={24} />
            {deleteHandler.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeletePermanent;
