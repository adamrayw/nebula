import { apiRequest } from "@/api/apiService";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/pages/core/components/design-system/ui/form";

const formSchema = z.object({
  folderName: z
    .string()
    .min(1, { message: "Folder name is required" })
    .max(50, {
      message: "Folder name must be less than 50 characters",
    }),
  parentId: z.string().optional(),
});

interface DialogAddFolderProps {
  parentFolderName?: {
    id?: string;
    name?: string;
    parentId?: string;
  };
}

const DialogAddFolder = ({ parentFolderName }: DialogAddFolderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const fileServiceUrl = import.meta.env.VITE_FILE_SERVICE_URL;
  const queryClient = useQueryClient();
  const [folderName, setFolderName] = useState<string>("");
  const [parentId, setParentId] = useState<string>("root");
  const userId = JSON.parse(localStorage.getItem("user")!)?.id;

  const createNewFolderData = {
    folderName: folderName,
    parentId: parentFolderName?.id,
    userId,
  };

  const createFolderHandler = useMutation({
    mutationFn: async () => {
      return await apiRequest(
        "post",
        fileServiceUrl,
        `/file/folders`,
        createNewFolderData
      );
    },
    onSuccess: () => {
      Promise.all([queryClient.invalidateQueries()]);
      toast.success("Folder created", {
        position: "top-center",
        duration: 3000,
      });
      setOpen(false);
    },
    onError: (error: AxiosError) => {
      toast.error("Failed to create folder, reason: " + error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folderName: "",
      parentId: "root",
    } as z.infer<typeof formSchema>,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { folderName, parentId } = values;

    setFolderName(folderName);
    setParentId(parentId || "root");
    createFolderHandler.mutate();
  }

  useEffect(() => {
    form.reset({
      folderName: "",
      parentId: "root",
    });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <span className="text-sm font-semibold">New Folder</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            color="#000000"
          >
            <path d="M12 8v8m4-4H8" />
          </svg>
        </Button>
      </DialogTrigger>
      {/* <DialogContent> */}
      <DialogContent className="sm:max-w-[425px] space-y-4">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col space-y-2">
              <p>Create a new folder</p>
              <p className="text-xs font-light text-gray-500">
                Parent Folder: {parentFolderName?.name ? parentFolderName.name : "root"}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="folderName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="folderName">Folder Name</FormLabel>
                    <Input
                      id="folderName"
                      placeholder="Folder Name"
                      {...field}
                      className="w-full"
                    />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-x-4 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  disabled={createFolderHandler.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {createFolderHandler.isPending
                    ? "Creating..."
                    : "Create Folder"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddFolder;
