import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../core/components/design-system/ui/sidebar";
import {
  ChevronUp,
  CreditCard,
  FileClock,
  Files,
  HardDrive,
  Lock,
  LogOut,
  Star,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../core/components/design-system/ui/dropdown-menu";
import { Button } from "../../core/components/design-system/ui/button";
import Logo from "../../core/components/design-system/Logo";
import { useEffect, useState } from "react";
import IUser from "@/types/IUser";
import { Link, useLocation } from "react-router";
import * as Progress from "@radix-ui/react-progress";
import { useGetUser } from "@/queries/useFetchUser";
import { Separator } from "@/pages/core/components/design-system/ui/separator";
import { useFetchTrash } from "@/queries/useFetchFiles";

const SidebarDashboard = () => {
  const [session, setSession] = useState<IUser>();
  const sessions = localStorage.getItem("user");

  const location = useLocation();

  useEffect(() => {
    if (!sessions) {
      window.location.href = "/signin";
    }

    setSession(JSON.parse(sessions!));
  }, []);

  const items = [
    {
      title: "My Files",
      url: "/dashboard",
      icon: <Files />,
      isPaid: false,
    },
    {
      title: "Starred",
      url: "/dashboard/starred",
      icon: <Star />,
      isPaid: false,
    },
    {
      title: "Trash",
      url: "/dashboard/trash",
      icon: <Trash />,
      isPaid: false,
    },
  ];

  const premiumItems = [
    {
      title: "Activity",
      url: "/dashboard/activity",
      icon: <FileClock />,
      isPaid: true,
    },
  ];

  const { data } = useGetUser() as {
    data?: { totalFileSize?: number; limit: number };
  };

  const { data: dataTrash } = useFetchTrash();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* <SidebarMenuButton
                    asChild
                    className="text-heading-6 !text-gray-500 !font-semibold"
                    isActive={window.location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton> */}

                  <SidebarMenuButton
                    asChild
                    className="text-heading-6 !text-gray-500 !font-semibold transition duration-100"
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url} className="py-6">
                      <div className="flex justify-between items-center w-full transition">
                        <div className="flex items-center space-x-2">
                          {item.icon}
                          <p>{item.title}</p>
                        </div>
                        <div className={`${item.isPaid ? "block" : "hidden"} `}>
                          <Lock size={14} />
                        </div>
                        <div
                          className={`${
                            item.title === "Trash" ? "block" : "hidden"
                          } `}
                        >
                          <div className="badge bg-blue-500 text-white rounded-full w-6 h-6 flex justify-center items-center">
                            <p>{dataTrash?.data.length}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Premium Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {premiumItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* <SidebarMenuButton
                    asChild
                    className="text-heading-6 !text-gray-500 !font-semibold"
                    isActive={window.location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton> */}

                  <SidebarMenuButton
                    asChild
                    className="text-heading-6 !text-gray-500 !font-semibold transition duration-100"
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url} className="py-6">
                      <div className="flex justify-between items-center w-full transition">
                        <div className="flex items-center space-x-2">
                          {item.icon}
                          <p>{item.title}</p>
                        </div>
                        <div className={`${item.isPaid ? "block" : "hidden"} `}>
                          <Lock size={14} />
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="space-y-4 p-6 bg-white shadow-sm rounded-lg text-sm">
              <div className="flex justify-between items-center">
                <p className="font-semibold">Usage</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  asChild
                >
                  <a href="/#pricing">
                    <HardDrive size={20} />
                    <p className="font-thin text-sm">Upgrade</p>
                  </a>
                </Button>
                {/* <div className="upgrade flex items-center space-x-1 bg-gray-100 p-1 rounded-lg shadow-sm hover:cursor-pointer ">
                </div> */}
              </div>
              <Progress.Root
                className="ProgressRoot"
                value={((data?.totalFileSize ?? 0) / (data?.limit ?? 1)) * 100}
              >
                <Progress.Indicator
                  className="ProgressIndicator"
                  style={{
                    transform: `translateX(-${
                      100 -
                      ((data?.totalFileSize ?? 0) / (data?.limit ?? 1)) * 100
                    }%)`,
                  }}
                />
              </Progress.Root>
              <p>
                {((data?.totalFileSize ?? 0) / 1024 / 1024).toFixed(2)} MB of{" "}
                {((data?.limit ?? 1) / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Separator className="my-2" />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <img
                    src={
                      session?.profile_img ??
                      "https://img.icons8.com/color/48/user-male-circle--v1.png"
                    }
                    alt="User"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />{" "}
                  {session?.fullName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem asChild>
                  <Button
                    asChild
                    variant="ghost"
                    type="submit"
                    className="w-full flex justify-start"
                  >
                    <Link to="/dashboard/payment-history">
                      <CreditCard /> Payment History
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    type="submit"
                    className="w-full flex justify-start"
                    onClick={() => {
                      window.location.href = "/";
                      localStorage.removeItem("user");
                      localStorage.removeItem("token");
                    }}
                  >
                    <LogOut /> Sign out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarDashboard;
