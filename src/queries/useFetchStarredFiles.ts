import { apiRequest } from "@/api/apiService";
import { IFile } from "@/types/IFile";
import { useQuery } from "@tanstack/react-query";

export function useStarredFetchFile(search: string, offset: number) {
  const fileUrl = import.meta.env.VITE_FILE_SERVICE_URL;

  return useQuery({
    queryKey: ["starredFiles"],
    queryFn: async () => {
      const response = (await apiRequest(`get`, fileUrl,
        `/file/starredFiles?s=${search}&offset=${offset}`
      )) as { data: IFile[]; totalFile: number; lastPage?: number };
    
      return {
        data: response.data,
        totalFile: response.totalFile,
        lastPage: response.lastPage,
      };
    },
  });
}
