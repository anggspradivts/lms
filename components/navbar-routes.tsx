"use client";
import { UserButton } from "@clerk/nextjs";
import {
  LogOutIcon,
  SearchIcon,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "./ui/input";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teach/course");

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 md:items-center space-y-5 md:space-y-0">
        <h1 className="hidden md:block text-xl text-sky-700">
          <Link href="/">Angga Web Course</Link>
        </h1>
        {!isTeacherPage ? (
          <>
            <Link href="/teach">
              <p>Teach</p>
            </Link>
            <Link href="/category">Category</Link>
            <Link href="/courses/enrolled">My Learning</Link>

            <ShoppingCart className="h-5 w-5" />
          </>
        ) : (
          <Link className="flex md:justify-center items-center gap-1" href="/">
            <LogOutIcon className="h-4 w-4" />
            <p>
              Quit <span className="">teach mode</span>
            </p>
          </Link>
        )}
        <div className="flex md:ml-auto gap-5">
          <UserButton />
          <div className="hidden md:block ">
            <Input className="rounded-xl pl-10 w-60" />
            <SearchIcon className="absolute top-6 ml-2" />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default NavbarRoutes;
