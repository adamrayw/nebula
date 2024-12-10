import SignInForm from "./modules/auth/components/SignInForm";
import SignUpForm from "./modules/auth/components/SignUpForm";
import Dashboard from "./modules/dashboard/Dashboard";
import DashboardLayout from "./modules/dashboard/DashboardLayout";
import Home from "./modules/home/Home";

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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      }
    ]
  }
];

export default routes;
