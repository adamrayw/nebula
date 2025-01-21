import SignInForm from "./pages/auth/components/SignInForm";
import SignUpForm from "./pages/auth/components/SignUpForm";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Home from "./pages/home/Home";
import Starred from "./pages/dashboard/components/starred/Starred";
import ConfirmPayment from "./pages/confirm_payment/components/ConfirmPayment";
import PaymentHistory from "./pages/dashboard/components/user/components/PaymentHistory";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },
  {
    path: "/signin",
    element: <SignInForm />,
  },
  {
    path: "/confirm-payment",
    element: <ConfirmPayment />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "starred",
        element: <Starred />,
      },  
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
];

export default routes;
