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
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
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
                  {/* <div className="absolute top-0 right-0 m-1 p-1 px-2 rounded-2xl bg-slate-200 text-slate-600">
                  {course.isPublished ? (
                    <p className="text-xs">published</p>
                  ) : (
                    <p className="text-xs">unpublished</p>
                  )}
                </div> */}
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
