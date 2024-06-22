"use client";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  imageUrl: string;
}

const MobileSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [course, setCourse] = useState<Course[]>([]);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

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

  return (
    <div>
      <Sheet>
        <SheetTrigger className=" hover:opacity-75 transition">
          <SearchIcon className="" />
        </SheetTrigger>

        <SheetContent side="top" className="p-3 bg-white">
          <div className="h-full w-full mt-8 p-3 border-b flex items-center bg-white shadow-sm space-x-4">
            <SearchIcon className="text-slate-500" />
            <input className="p-2" placeholder="type anything..." value={keyword} onChange={handleChange}/>
          </div>
          <div className="h-[100vh]">
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
                    height={70}
                    width={70}
                    alt="course img"
                  />
                </div>
                <div>
                  <p className="text-xs">{course.title}</p>
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSearch;
