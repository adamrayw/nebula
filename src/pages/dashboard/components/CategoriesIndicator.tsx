import { Card } from "@/pages/core/components/design-system/ui/card";
import { useFetchCategories } from "@/queries/useFetchFiles";
import { ICategory } from "@/types/ICategory";
import { FaFile, FaFileAudio, FaFileImage, FaFilePdf, FaFileVideo } from "react-icons/fa";

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
    <section className="my-10">
      <div className="grid grid-cols-4 gap-x-4 place-items-center">
        {data?.data.map((category: ICategory) => (
          <Card key={category.id} className=" w-full p-5 space-y-2">
            {icons[category.slug as keyof typeof icons] || (
              <FaFile size="24" className="text-green-500" />
            )}
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-xs">{category?.Files?.length} items</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoriesIndicator;
