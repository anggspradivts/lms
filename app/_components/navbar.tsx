import NavbarRoutes from "@/components/navbar-routes";
import MobileNavbar from "./MobileNavbar";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <div className="p-4 border-b border-gray shadow-lg">
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      <div className="hidden md:block">
        <NavbarRoutes />
      </div>
    </div>
  );
};

export default Navbar;
