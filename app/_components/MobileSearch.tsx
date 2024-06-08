import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchIcon } from "lucide-react";

const MobileSearch = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className=" hover:opacity-75 transition">
          <SearchIcon className="" />
        </SheetTrigger>

        <SheetContent side="top" className="p-3 bg-white">
          <div className="h-full w-full mt-8 p-3 border-b flex items-center bg-white shadow-sm space-x-4">
            <SearchIcon className="text-slate-500" />
            <input className="p-2" placeholder="type anything..." />
          </div>
          <div className="h-[100vh]">{/* search query content */}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSearch;
