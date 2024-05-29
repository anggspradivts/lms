import NavbarRoutes from "@/components/navbar-routes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const MobileNavbar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white">
          <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
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
