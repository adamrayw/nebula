export interface IFolder {
  id?: string;
  name?: string;
  parentId?: string | null;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  files?: IFile[];
  folders?: IFolder[];
}

export interface IFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt?: string;
  updatedAt?: string;
  folderId?: string;
  deletedAt?: string | null;
}

export interface DialogAddFolderProps {
  parentFolderName?: {
    id?: string;
    name?: string;
    parentId?: string;
  } | undefined;
};