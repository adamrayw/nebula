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
  starred: Starred;
}

// export interface IFile {
//   file: {
//     id: string;
//     originalName: string;
//     url: string;
//     type?: string;
//     size?: number;
//     userId: string;
//     mimeType?: string;
//     location: string;
//     categoryId?: string | null;
//     createdAt: string;
//     updatedAt: string;
//     starred: Starred;
//   } | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

export interface FileIconProps {
  url: string;
  size?: number;
  color?: string;
}
