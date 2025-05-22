import { apiRequest } from "@/api/apiService";
import { IQuickAccess } from "@/types/IQuickAccess";
import { useQuery } from "@tanstack/react-query";

export function useFetchQuickAccess() {
  const quickAccessUrl = import.meta.env.VITE_FILE_SERVICE_URL;
  return useQuery({
    queryKey: ["quickAccess"],
    queryFn: async () => {
      const response = (await apiRequest(`get`, quickAccessUrl,
        `/file/pinnedItems`
      )) as {
        status: string;
        data: IQuickAccess[];
      };

      return {
        status: response.status,
        data: response.data,
      };
    },
  });
}
