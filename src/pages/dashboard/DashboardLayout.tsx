import { Outlet } from "react-router";
import SidebarDashboard from "./components/Sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../core/components/design-system/ui/sidebar";

const DashboardLayout = () => {
  // Menu items.

  return (
    <div className="flex w-full">
      <SidebarProvider>
        <SidebarDashboard />
        <main className="w-full">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
