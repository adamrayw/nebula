import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/pages/core/components/design-system/ui/select";
import { useFetchActivity } from "@/queries/useFetchActivity";
import { IActivity } from "@/types/IActivity";
import moment from "moment";

const Activity = () => {
  const userId = JSON.parse(localStorage.getItem("user")!).id;

  const { data } = useFetchActivity(userId);

  const typeColor = (type: string) => {
    switch (type) {
      case "login":
        return "bg-green-100 text-green-500";
      case "logout":
        return "bg-red-100 text-red-500";
      case "create":
        return "bg-blue-100 text-blue-500";
      case "update":
        return "bg-yellow-100 text-yellow-500";
      case "delete":
        return "bg-red-100 text-red-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="px-10">
      <h1 className="text-2xl font-semibold mb-5">Activity Log</h1>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <div className="flex items-center">
            <p className="text-sm font-semibold mr-2 text-nowrap">Sort by:</p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center ml-5">
            <span className="text-sm font-semibold mr-2">Order:</span>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select order" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ascending">Ascending</SelectItem>
                  <SelectItem value="descending">Descending</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold mr-2">Search:</span>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-2 py-1"
            name="search"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {data?.data.map((activity: IActivity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between py-5 border-b"
          >
            <div className="flex items-center space-x-2">
              <p className={`text-sm font-semibold uppercase w-fit rounded-full py-1 px-2 ${typeColor(activity.type)})`}>{activity.type}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
            <p className="text-sm text-gray-500">
              {moment(activity.createdAt).startOf("second").fromNow()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
