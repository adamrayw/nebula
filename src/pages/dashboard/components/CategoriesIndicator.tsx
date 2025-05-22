import { Card } from "@/pages/core/components/design-system/ui/card";
import { useFetchCategories } from "@/queries/useFetchFiles";
import { ICategory } from "@/types/ICategory";
import {
  FaFile,
  FaFileAudio,
  FaFileImage,
  FaFilePdf,
  FaFileVideo,
} from "react-icons/fa";

const CategoriesIndicator = () => {
  const { data }: { data?: { data: ICategory[] } } = useFetchCategories() as {
    data?: { data: ICategory[] };
  };

  const icons = {
    image: <FaFileImage size="24" className="text-[#6f42c1]" />,
    audio: <FaFileAudio size="24" className="text-[#17a2b8]" />,
    video: <FaFileVideo size="24" className="text-[#ffc107]" />,
    document: <FaFilePdf size="24" className="text-[#d9534f]" />,
  };

  return (
    <section className="my-10 space-y-10">
      <div className="space-y-5">
        <h1>
          <span className="text-2xl font-semibold">My Categories</span>
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-x-4 lg:gap-y-0 gap-y-2 place-items-center">
          {data?.data.map((category: ICategory) => (
            <Card key={category.id} className=" w-full p-5 space-y-2">
              {icons[category.slug as keyof typeof icons] || (
                <FaFile size="24" className="text-green-500" />
              )}
              <h3 className="sm:text-sm lg:font-medium md:font-medium">
                {category.name}
              </h3>
              <p className="text-xs">{category?.files?.length} items</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesIndicator;
