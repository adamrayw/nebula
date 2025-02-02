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

const Notification = () => {
  const { data } = useGetNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="ml-3" size="icon">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="divide-y divide-gray-100">
            {data?.map((notification: INotification) => (
              <div
                key={notification.id}
                className="p-4 flex items-start gap-3 hover:bg-gray-50"
              >
                {/* <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" /> */}
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {moment(notification.createdAt).startOf('second').fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
