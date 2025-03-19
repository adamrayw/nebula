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
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import { useEffect, useState } from "react";

const Activity = () => {
  const [order, setOrder] = useState<string>("decending");
  const [search, setSearch] = useState<string>("");
  const debounceTerm = useDebounce(search, 300);

  const userId = JSON.parse(localStorage.getItem("user")!).id;

  const { data, refetch } = useFetchActivity(userId, order, search);

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

  useEffect(() => {
    refetch();
  }, [order, debounceTerm]);

  const handleOrderChange = (value: string) => {
    setOrder(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="px-10">
      <h1 className="text-2xl font-semibold mb-5">Activity Log</h1>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          {/* <span className="text-sm font-semibold mr-2">Urut:</span> */}
          <Select onValueChange={handleOrderChange} defaultValue={order}>
            <SelectTrigger>
              <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ascending">Terlama</SelectItem>
                <SelectItem value="decending">Terbaru</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold mr-2">Search:</span>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-1"
            name="search"
            value={search}
            onChange={(e) => handleSearchChange(e)}
            placeholder="Search by description"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {data?.data?.length === 0 && (
          <p className="text-center my-4 text-sm">
            No activity found.
          </p>
        )}
        {data?.data.map((activity: IActivity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between py-5 border-b"
          >
            <div className="flex items-center space-x-2">
              <p
                className={`text-sm font-semibold uppercase w-fit rounded-full py-1 px-2 ${typeColor(
                  activity.type
                )})`}
              >
                {activity.type}
              </p>
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
