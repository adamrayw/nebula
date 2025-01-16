import { IFile } from "./IFile";

export interface ICategory {
    id: string;
    slug?: string;
    name?: number;
    createdAt?: string;
    updatedAt?: string;
    Files: IFile
}