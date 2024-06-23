"use client";
import { UserButton } from "@clerk/nextjs";
import { Loader, Loader2, LogOutIcon, SearchIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Course {
  id: string;
  title: string;
  imageUrl: string;
}

const NavbarRoutes = () => {
  const [keyword, setKeyword] = useState("");
  const [course, setCourse] = useState<Course[]>([]);
  const [container, setContainer] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith("/teach/course");
  const searchRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setContainer(true);
  };

  useEffect(() => {
    const searchData = async () => {
      try {
        const res = await axios.get("/api/search", { params: { q: keyword } });
        const data = res.data;
        setCourse(data);
        if (!keyword) {
          setCourse([]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    searchData();
  }, [keyword]);

  // click outside ui
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setContainer(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // click outside ui

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
            {/* <Link href="/category">Category</Link> */}
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
          {!isTeacherPage && (
            <div
              ref={searchRef}
              onClick={() => setContainer(true)}
              className="hidden md:block"
            >
              <Input
                className="rounded-xl pl-10 w-60"
                name="search"
                value={keyword}
                onChange={handleChange}
                placeholder="search courses..."
              />
              <SearchIcon className="absolute top-6 ml-2" />
            </div>
          )}
          {container && (
            <div className="w-[400px] h-[100px] max-h-[300px] bg-slate-200 absolute top-20 right-5 p-3 rounded-lg overflow-y-scroll space-y-1">
              {course.map((course) => (
                <div
                  key={course.id}
                  className="flex space-x-2 bg-slate-100 rounded-sm p-1"
                  onClick={() => {
                    router.push(`/courses/${course.id}`);
                  }}
                >
                  <div>
                    <Image
                      src={course.imageUrl}
                      className="h-auto w-auto"
                      height={50}
                      width={50}
                      alt="course img"
                    />
                  </div>
                  <div>
                    <p className="text-xs">{course.title}</p>
                  </div>
                </div>
              ))}
              {!keyword && (
                <div className="text-slate-600">type something...</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default NavbarRoutes;
