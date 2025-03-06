import { Bell } from "lucide-react";
import { Button } from "./design-system/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./design-system/ui/dropdown-menu";
import { useGetNotifications } from "@/queries/useFetchNotifications";
import moment from "moment";
import { INotification } from "@/types/INotification";
import { Link } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Notification = () => {
  const { data, isError } = useGetNotifications();

  const limit5 = data?.slice(0, 5);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch notifications");
    }
  }, [isError]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="mx-3" size="icon">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuLabel>
          <div className="flex justify-between">
            <p>Notifications</p>
            <p>
              <Link to="" className="ml-2 text-xs text-blue-500">
                See all notifications ({data?.length})
              </Link>
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="divide-y divide-gray-100">
            {limit5?.map((notification: INotification) => (
              <div
                key={notification.id}
                className="p-4 flex items-start gap-3 hover:bg-gray-50"
              >
                {/* <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" /> */}
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {moment(notification.createdAt).startOf("second").fromNow()}
                  </p>
                </div>
              </div>
            ))}
            {data?.length === 0 && (
              <div className="p-4 flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">No notifications</p>
                </div>
              </div>
            )}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
