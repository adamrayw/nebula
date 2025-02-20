import { ReactNode } from "react";

interface Starred {
    id: string;
    userId: string;
    fileId: string;
    createdAt: string;
    updatedAt: string;
}
export interface IFile {
    length: ReactNode;
    id: string;
    name?: string;
    size?: number;
    type?: string;
    file: FileList;
    originalName?: string;
    mimeType?: string;
    location?: string;
    createdAt?: string;
    updatedAt?: string;
    starred: Starred
}

export interface FileUploadProps extends File {
  category?: string;
  preview?: string | Blob;
  type: string;
  name: string;
  size: number;
  status?: "success",
}

export interface FileIconProps {
  url: string;
  size?: number;
  color?: string;
}