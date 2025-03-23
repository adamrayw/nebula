import { apiRequest } from "@/api/apiService";
import { ICategory } from "@/types/ICategory";
import { IFile } from "@/types/IFile";
import { useQuery } from "@tanstack/react-query";
const fileUrl = import.meta.env.VITE_FILE_SERVICE_URL;

export function useFetchFile(search: string, offset: number, sortBy: string, sortOrder: string) {

    return useQuery({
        queryKey: ["files"],
        queryFn: async () => {
            const response = await apiRequest(`get`, fileUrl, `/file/getFiles?s=${search}&offset=${offset}&sortBy=${sortBy}&sortOrder=${sortOrder}`) as { data: IFile[], totalFile: number, lastPage?: number };
            
            return {
                data: response.data,
                totalFile: response.totalFile,
                lastPage: response.lastPage
            };
        },
    });
}

export function useFetchCategories() {
    return useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const response = await apiRequest("get", fileUrl, "/file/categories") as { data: ICategory }

            return {
                data: response.data
            }
        }
    })
}

export function useFetchTrash() {
    return useQuery({
        queryKey: ['trash'],
        queryFn: async () => {
            const response = await apiRequest("get", fileUrl, "/file/trash") as { data: IFile[] }

            return {
                data: response.data
            }
        }
    })
}
