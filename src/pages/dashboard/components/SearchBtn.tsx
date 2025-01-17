import { Input } from "@/pages/core/components/design-system/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const SearchBtn = ({
  setSearch,
  refetch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
}) => {
  const [input, setInput] = useState<string>("");
  const debounceTerm = useDebounce(input, 300);

  useEffect(() => {
    setSearch(input);
    refetch();
  }, [debounceTerm]);

  return (
    <div className="relative h-12 w-full">
      <Search className="absolute left-3 size-4 sm:size-5 lg:size-auto md:size-auto top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
      <Input
        placeholder="Search file name or type"
        className="pl-12 pr-3 py-2 text-xs sm:text-base lg:text-base md:text-base h-12 bg-gray-50 font-medium"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBtn;
