import { fetch } from "@/api/fetch";
import { IFile } from "@/types/IFile";
import { useQuery } from "@tanstack/react-query";

export function useFetchFile(search: string) {

    return useQuery<IFile[]>({
        queryKey: ["files"],
        queryFn: async () => {
            const response = await fetch(`/file/getFiles?s=${search}`);
            if (!response || typeof response !== "object" || !("data" in response)) {
                throw new Error("Invalid response");
            }
            return response.data as IFile[];
        },
    });

}
