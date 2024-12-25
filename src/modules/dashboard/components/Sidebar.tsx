import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../core/components/design-system/ui/sidebar";
import { ChevronUp, Files, LogOut } from "lucide-react";
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
import { Link } from "react-router";
import * as Progress from "@radix-ui/react-progress";
import { useGetUser } from "@/queries/useFetchUser";
import { Separator } from "@/modules/core/components/design-system/ui/separator";

const SidebarDashboard = () => {
  const [session, setSession] = useState<IUser>();
  const sessions = sessionStorage.getItem("user");

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
    },
  ];

  const { data } = useGetUser() as {
    data?: { totalFileSize?: number; limit: number };
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-heading-6 !text-gray-500 !font-semibold"
                    isActive={window.location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
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
              <p className="font-semibold">Storage</p>
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
                {(52428800 / 1024 / 1024).toFixed(2)} MB
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
                    variant="ghost"
                    type="submit"
                    className="w-full flex justify-start"
                    onClick={() => {
                      window.location.href = "/";
                      sessionStorage.removeItem("user");
                      sessionStorage.removeItem("token");
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
