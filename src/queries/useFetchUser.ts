import { fetch } from "@/api/fetch";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
    return useQuery({
        queryKey: ["getLimit"],
        queryFn: async () => {
            const response = await fetch("/user/getUserInfo");
            if (!response || typeof response !== "object" || !("data" in response)) {
                throw new Error("Invalid response");
            }
            return response.data;
        },
    });
}