import SignInForm from "./pages/auth/components/SignInForm";
import SignUpForm from "./pages/auth/components/SignUpForm";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Home from "./pages/home/Home";
import Starred from "./pages/dashboard/components/starred/Starred";
import DetailUpload from "./pages/dashboard/components/DetailUpload";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    // path: "/detail-upload/:userId",
    path: "/detail-upload",
    element: <DetailUpload />,
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
    ],
  },
];

export default routes;
