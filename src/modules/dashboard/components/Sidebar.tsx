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
import { ChevronUp, Library } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../core/components/design-system/ui/dropdown-menu";
import { Button } from "../../core/components/design-system/ui/button";
import Logo from "../../core/components/design-system/Logo";

const SidebarDashboard = () => {
  const items = [
    {
      title: "Main Library",
      url: "/dashboard",
      icon: Library,
    },
  ];

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
                    isActive
                  >
                    <a href={item.url}>
                      <Library className="w-20 h-20" />
                      <span>{item.title}</span>
                    </a>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <img
                    src={""}
                    alt="User"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />{" "}
                  {/* {sessions?.user?.name} */}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <form>
                    <Button
                      variant="ghost"
                      type="submit"
                      className="w-full flex justify-start"
                    >
                      {/* <LogOut /> Sign out */}
                    </Button>
                  </form>
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
