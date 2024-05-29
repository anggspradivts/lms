"use client";
import { UserButton } from "@clerk/nextjs";
import { Book, BookIcon, LogOutIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teach");

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 items-center">
        <h1 className="hidden md:block text-xl">Angga Web Course</h1>
        {!isTeacherPage ? (
          <>
            <Link href="/teach">
              <p>Teach</p>
            </Link>
            <Link href="/category">Category</Link>
            <ShoppingCart className="h-5 w-5" />
          </>
        ) : (
          <>
            <Link className="flex justify-center items-center gap-1" href="/">
              <LogOutIcon className="h-4 w-4" />
              <p>Back</p>
            </Link>
            <h1 className="text-sky-700">Teach Mode</h1>
            <BookIcon className="text-sky-700"/>
          </>
        )}
        <div className="ml-auto">
          
          <UserButton />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default NavbarRoutes;
