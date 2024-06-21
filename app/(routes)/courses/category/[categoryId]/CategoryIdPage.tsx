import { cn } from "@/lib/utils";
import { Category, Course } from "@prisma/client";
import { ImageIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CategoryIdPageProps {
  course: Course[];
  category: Category | null;
}
const CategoryIdPage = ({ course, category }: CategoryIdPageProps) => {
  return (
    <div>
      <div className="py-4">
        <p className="text-xl font-bold">
          <span>{category?.name}</span> Courses
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {course && course.length > 0 ? (
          course.map((course, index) => (
            <Link key={course.id} className="" href={`/courses/${course.id}`}>
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
                    <ImageIcon className="" />
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
            {/* <LoaderCircle className="animate-spin" /> */}
            No Course Found
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryIdPage;
