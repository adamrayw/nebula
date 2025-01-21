import { Button } from "@/pages/core/components/design-system/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/pages/core/components/design-system/ui/table";
import { useFetchPayment } from "@/queries/useFetchPayments";
import { IPayment } from "@/types/IPayment";
import { Link } from "lucide-react";
import moment from "moment";

const PaymentHistory = () => {
  const { data, isLoading } = useFetchPayment();

  return (
    <div className="px-10">
      <h1 className="text-2xl font-semibold mb-5">Payment History</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Link</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>Loading...</TableCell>
            </TableRow>
          ) : (
            <>
              {data?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No payment history found
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {data?.data?.map((payment: IPayment) => (
                    <TableRow key={payment.transaksiId}>
                      <TableCell>#{payment.transaksiId}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{payment.price}</TableCell>
                      <TableCell>
                        <p
                          className={`p-1 rounded text-xs text-center ${
                            payment.status === "success"
                              ? "text-green-600 bg-green-200"
                              : "text-yellow-600 bg-yellow-200"
                          }`}
                        >
                          {payment.status}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Button
                          asChild
                          size="sm"
                          variant="ghost"
                          className="text-xs"
                        >
                          <a href={payment.paymentUrl}>
                            <Link />
                            Pay Now
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell>
                        {moment(payment.createdAt).format("LLL")}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistory;
