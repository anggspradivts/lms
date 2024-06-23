import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Course, Purchase } from "@prisma/client";
import { ImageIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EnrolledPageProps {
  initialData: Course[];
}
const EnrolledPage = ({ initialData }: EnrolledPageProps) => {

  return (
    <div className="">
      <header className="bg-slate-300 px-20 pt-20 pb-5">
        <h1 className="text-3xl md:text-6xl font-bold">My Learning</h1>
      </header>
      <div className="flex justify-end items-center px-20">
        <div className="py-2">
          <Input type="search" placeholder="search on learning..."/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 px-20">
        {initialData && initialData.length > 0 ? (
          initialData.map((course, index) => (
            <Link key={course.id} href={`/courses/enrolled/${course.id}`}>
              <div className="h-[200px] w-full transition-all duration-300 hover:scale-95">
                <div
                  className={cn(
                    `relative w-full h-5/6`,
                    !course.imageUrl &&
                      "flex items-center justify-center bg-slate-300"
                  )}
                >
                  {course.imageUrl ? (
                    <Image
                      className="object-cover w-full h-full"
                      src={course.imageUrl}
                      height={300}
                      width={300}
                      alt="image url"
                    />
                  ) : (
                    <>
                      <ImageIcon className="" />
                    </>
                  )}
                </div>
                <div className="h-1/6 flex items-center bg-slate-200 p-1">
                  <p className="w-full h-full">
                    {index + 1}. {course.title}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <LoaderCircle className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledPage;
