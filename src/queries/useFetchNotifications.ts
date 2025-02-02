import { apiRequest } from "@/api/apiService";
import { INotification } from "@/types/INotification";
import { useQuery } from "@tanstack/react-query";

export function useGetNotifications() {
    const notificationUrl = import.meta.env.VITE_NOTIFICATION_SERVICE_URL;

    return useQuery<INotification[]>({
        queryKey: ["getNotifications"],
        queryFn: async () => {
            const response = await apiRequest("get", notificationUrl, `/notification`);
            if (!response || typeof response !== "object" || !("data" in response)) {
                throw new Error("Invalid response");
            }
            return response.data as INotification[];
        },
    });
}