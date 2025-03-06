import { apiRequest } from "@/api/apiService";
import { IPayment } from "@/types/IPayment";
import { useQuery } from "@tanstack/react-query";

export function useFetchPayment(search?: string, offset?: number) {
  const paymentUrl = import.meta.env.VITE_PAYMENT_SERVICE_URL;
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = (await apiRequest(`get`, paymentUrl,
        `/payments?s=${search}&offset=${offset}`
      )) as { data: IPayment[]; totalFile: number; lastPage?: number };
      
      return {
        data: response.data,
      };
    },
  });
}
