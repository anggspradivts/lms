import NavbarRoutes from "@/components/navbar-routes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, SearchIcon } from "lucide-react";
import MobileSearch from "./MobileSearch";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const MobileNavbar = () => {
  return (
    <div>
      <Sheet>
        <div className="flex justify-between items-center">
          <SheetTrigger className=" hover:opacity-75 transition">
            <Menu />
          </SheetTrigger>
          <div className="flex items-center space-x-3">
            <MobileSearch />
            <UserButton />
          </div>
        </div>
        <SheetContent side="left" className="p-0 bg-white">
          <div className="h-full p-6 border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="">
              <h1 className="text-1xl font-bold">Angga Web Course</h1>
            </div>
            <div className="flex flex-col w-full">
              <NavbarRoutes />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
