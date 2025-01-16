import { get } from "@/api/file";
import { ICategory } from "@/types/ICategory";
import { IFile } from "@/types/IFile";
import { useQuery } from "@tanstack/react-query";

export function useFetchFile(search: string, offset: number, sortBy: string, sortOrder: string) {

    return useQuery({
        queryKey: ["files"],
        queryFn: async () => {
            const response = await get(`/file/getFiles?s=${search}&offset=${offset}&sortBy=${sortBy}&sortOrder=${sortOrder}`) as { data: IFile[], totalFile: number, lastPage?: number };
            if (!response || typeof response !== "object" || !("data" in response)) {
                throw new Error("Invalid response");
            }
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
            const response = await get("/file/categories") as { data: ICategory }

            return {
                data: response.data
            }
        }
    })
}
