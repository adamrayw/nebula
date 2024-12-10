import { Input } from '@/modules/core/components/design-system/ui/input'
import { Search } from 'lucide-react'

const SearchBtn = () => {
  return (
    <div className="relative h-12 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
        <Input
          placeholder="Search"
          className="pl-12 pr-3 py-2 text-md h-12 bg-gray-50 font-semibold"
        />
      </div>
  )
}

export default SearchBtn