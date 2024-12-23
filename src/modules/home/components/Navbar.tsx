import Logo from "@/modules/core/components/design-system/Logo";
import { Button } from "@/modules/core/components/design-system/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/modules/core/components/design-system/ui/dropdown-menu";
import IUser from "@/types/IUser";
import { ChevronDown, Library, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [session, setSession] = useState<IUser>();
  const sessions = sessionStorage.getItem("user");

  useEffect(() => {
    if (sessions) {
      setSession(JSON.parse(sessions!));
    }

  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-cen
          ter"
          >
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
              <span className="text-lg font-semibold text-gray-900">
                Nebula
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Features
            </Link>
          </div>

          {/* Register Button */}
          <div className="flex items-center">
            {session ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <img
                        src={
                          session?.profile_img ??
                          "https://img.icons8.com/color/48/user-male-circle--v1.png"
                        }
                        alt="profile"
                        width="30"
                        height="30"
                        className="rounded-full"
                      />
                      {session?.fullName}
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">
                        <Library /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <p
                        onClick={() => {
                          window.location.href = "/";
                          sessionStorage.removeItem("user");
                          sessionStorage.removeItem("token");
                        }}
                      >
                        <LogOut /> Sign out
                      </p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild className="btn-primary">
                <Link to="/signup">Sign up</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
