import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../core/components/design-system/ui/button";
import { useMutation } from "@tanstack/react-query";
import { post } from "@/api/payment";
import toast from "react-hot-toast";
import LoadingSpinner from "../../core/components/design-system/LoadingSpinner";
import { ICreatePayment, IPaymentResponse } from "@/types/IPayment";
import {
  Alert,
  AlertDescription,
} from "../../core/components/design-system/ui/alert";
import { useEffect } from "react";

const ConfirmPayment = () => {
  const data = JSON.parse(sessionStorage.getItem("selectedPlan") || "{}");
  const userId = JSON.parse(sessionStorage.getItem("user") || "{}").id;
  const sessions = sessionStorage.getItem("user");
  const location = useNavigate();

  useEffect(() => {
    if (!sessions) {
      toast("You need to sign in to proceed with payment", {
        icon: "⚠️",
      });
      location("/signin");
      // window.location.href = "/signin";
    }
  }, []);

  const mutation = useMutation<IPaymentResponse, Error, ICreatePayment>({
    mutationFn: (newData: ICreatePayment) => post("/payments", newData),
  });

  if (mutation.isSuccess) {
    toast("Payment link created successfully!", {
      icon: "🚀",
    });
  }

  if (mutation.isError) {
    toast.error("Payment failed!");
  }

  const handlePay = () => {
    const item = {
      userId,
      price: data.price,
      type: data.name.toLowerCase(),
      limit: data.limit,
    };

    mutation.mutate(item);
  };

  console.log(mutation);

  return (
    <section className="space-y-20">
      {/* navbar back */}
      <div>
        <div className="px-10 shadow">
          <nav className="flex items-center py-2" aria-label="Back">
            <Button variant="ghost" asChild>
              <Link to="/" className="text-sm font-medium flex text-blue-600">
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                <span className="ml-2">Back</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
      {/* main content */}
      <div className="flex flex-col items-center justify-center h-full mx-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Confirm Payment
        </h1>
        <p className="text-gray-600 text-center mb-6">
          You are about to subscribe to our{" "}
          <span className="font-bold">{data.name}</span> plan.
        </p>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <div className="flex justify-between flex-wrap items-center bg-white shadow-sm rounded-lg p-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {data.name} Plan
              </h2>
              <p className="text-gray-600">Billed monthly</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {data.price}
              </span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
          </div>
          <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Total</h2>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {data.price}
              </span>
            </div>
          </div>
          {mutation.isSuccess && (
            <Alert variant="default">
              <AlertDescription className="text-xs">
                Your payment link has been saved. You can now proceed to make
                the payment by clicking the button below to pay now.
              </AlertDescription>
            </Alert>
          )}
          {mutation.isPending ? (
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled
            >
              <LoadingSpinner />
            </Button>
          ) : (
            <>
              {mutation.isSuccess ? (
                <>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Link to={mutation.data?.data.midtrans.redirect_url}>
                      Pay Now
                    </Link>
                  </Button>
                  <Link
                    to="/dashboard"
                    className="text-blue-600 text-sm text-center"
                  >
                    Go to Payment History
                  </Link>
                </>
              ) : (
                <Button
                  onClick={handlePay}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Create Payment Link
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConfirmPayment;
