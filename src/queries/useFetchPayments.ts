import { get } from "@/api/payment";
import { IPayment } from "@/types/IPayment";
import { useQuery } from "@tanstack/react-query";

export function useFetchPayment(search?: string, offset?: number) {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = (await get(
        `/payments?s=${search}&offset=${offset}`
      )) as { data: IPayment[]; totalFile: number; lastPage?: number };
      if (!response || typeof response !== "object" || !("data" in response)) {
        throw new Error("Invalid response");
      }
      return {
        data: response.data,
      };
    },
  });
}
