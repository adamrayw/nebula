import { apiRequest } from "@/api/apiService";
import { IActivity } from "@/types/IActivity";
import { useQuery } from "@tanstack/react-query";

export function useFetchActivity(userId: string, order: string, search: string) {
  const activityUrl = import.meta.env.VITE_ACTIVITY_SERVICE_URL;
  return useQuery({
    queryKey: ["activity"],
    queryFn: async () => {
      const response = (await apiRequest(`get`, activityUrl,
        `/activity/${userId}?order=${order}&search=${search}`
      )) as {
        data: IActivity[];
      };

      return {
        data: response.data,
      };
    },
  });
}
