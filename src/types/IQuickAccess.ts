import { IFile } from "./IFile";

export interface IQuickAccess {
    id: string;
    userId: string;
    targetId: string;
    type: string;
    pinnedAt: string;
    status: string;
    file: IFile;
}