import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../core/components/design-system/ui/tabs";
import { Folder } from "lucide-react";
import SearchBtn from "./components/SearchBtn";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 border-r h-screen px-10">
        <SearchBtn />
        <h1 className="text-heading-3 !font-normal !text-gray-800 mb-4">
          Main Library
        </h1>
        <Tabs defaultValue="files">
          <TabsList>
            <TabsTrigger value="files" className="tab">
              Files
            </TabsTrigger>
          </TabsList>
          <TabsContent value="files">
            <div className="grid grid-cols-4 gap-6 my-10">
              <Folder className="w-20 h-20" />
              <Folder className="w-20 h-20" />
              <Folder className="w-20 h-20" />
              <Folder className="w-20 h-20" />
              <Folder className="w-20 h-20" />
              <Folder className="w-20 h-20" />
              <Folder className="w-20 h-20" />
              <Folder className="w-20 h-20" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="px-4">Activity</div>
    </div>
  );
};

export default Dashboard;
