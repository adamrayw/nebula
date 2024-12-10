import Logo from "@/modules/core/components/design-system/Logo";
import { Button } from "@/modules/core/components/design-system/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/modules/core/components/design-system/ui/dropdown-menu";
import { ChevronDown, Library, LogOut } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const session = false;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-cen
          ter">
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
            {/* <Link
              href="/files"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Files
            </Link>
            <Link
              href="/shared"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Shared
            </Link> */}
          </div>

          {/* Register Button */}
          <div className="flex items-center">
            {session ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <img
                        // src={session?.user?.image ?? ""}
                        alt="profile"
                        width="30"
                        height="30"
                        className="rounded-full"
                      />
                      {/* {session?.user?.name} */}
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
                          onClick={async () => {
                          "use server";
                          // await signOut({ redirectTo: "/" });
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
