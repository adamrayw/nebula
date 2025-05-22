import { Card } from "@/pages/core/components/design-system/ui/card";
import { useFetchQuickAccess } from "@/queries/useFetchQuickAccess";
import { IQuickAccess } from "@/types/IQuickAccess";
import FileIcon from "./FileIcon";

const QuickAccess = () => {
  const { data }: { data?: { data: IQuickAccess[] } } =
    useFetchQuickAccess() as {
      data?: { data: IQuickAccess[] };
    };

  return (
    <section className="my-10 space-y-10">
      <div className="space-y-5">
        <h1>
          <span className="text-2xl font-semibold">Quick Access</span>
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4 lg:gap-y-4 place-items-center">
          {data?.data.map((item: IQuickAccess) => (
            <Card key={item.id} className="w-full p-5 space-y-2">
              <div className="flex items-center space-x-2">
                <FileIcon url={item.file.originalName || ""} />
                <h3 className="sm:text-sm lg:font-medium md:font-medium truncate">
                  {item.file.originalName}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
