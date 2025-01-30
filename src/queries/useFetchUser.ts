import { apiRequest } from "@/api/apiService";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
    const userUrl = import.meta.env.VITE_USER_SERVICE_URL;

    return useQuery({
        queryKey: ["getLimit"],
        queryFn: async () => {
            const response = await apiRequest("get", userUrl, "/user/getUserInfo");
            if (!response || typeof response !== "object" || !("data" in response)) {
                throw new Error("Invalid response");
            }
            return response.data;
        },
    });
}