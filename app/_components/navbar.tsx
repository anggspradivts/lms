import NavbarRoutes from "@/components/navbar-routes";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <div className="p-4 border-b border-gray">
      <MobileNavbar />
      <div className="hidden md:block">
        <NavbarRoutes />
      </div>
    </div>
  );
};

export default Navbar;
