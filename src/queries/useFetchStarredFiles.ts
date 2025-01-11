import { get } from "@/api/file";
import { IFile } from "@/types/IFile";
import { useQuery } from "@tanstack/react-query";

export function useStarredFetchFile(search: string, offset: number) {
  return useQuery({
    queryKey: ["starredFiles"],
    queryFn: async () => {
      const response = (await get(
        `/file/starredFiles?s=${search}&offset=${offset}`
      )) as { data: IFile[]; totalFile: number; lastPage?: number };
      if (!response || typeof response !== "object" || !("data" in response)) {
        throw new Error("Invalid response");
      }
      return {
        data: response.data,
        totalFile: response.totalFile,
        lastPage: response.lastPage,
      };
    },
  });
}
