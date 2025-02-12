import { fileTypeFromBlob } from "file-type";
import toast from "react-hot-toast";

async function validateExtension(file: any) {
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

    if (file) {
        const fileType = await fileTypeFromBlob(file);

        if (fileType && ["mp3"].includes(fileType.ext)) {
            return "audio";
        } else if (
            fileType &&
            ["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(fileType.ext)
        ) {
            return "image";
        } else if (fileType && ["mp4"].includes(fileType.ext)) {
            return "video";
        } else if (
            fileType &&
            ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(
                fileType.ext
            )
        ) {
            return "document";
        }

        if (!fileType || !allowedExtensions.has(fileType.ext)) {
            toast("Please upload a valid file type", {
                position: "bottom-center",
                icon: "⚠️",
            });
            return;
        }
    }
}

export default validateExtension;

/*
 The  validateExtension  function is responsible for validating the file extension. It checks if the file is of the allowed file types and returns the file type. If the file type is not allowed, it shows a toast notification. 
 Now, let's create a new function to validate the file size.
 */