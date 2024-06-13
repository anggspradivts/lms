import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


const CoursePage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  let condition;

  if (condition === "updatedAt") {
    condition = { updatedAt: "asc" };
  } else {
    condition = { createdAt: "asc" };
  }

  const course = await db.course.findMany({
    where: {
      userId: userId,
    },
    // orderBy: condition,
    orderBy: {
      createdAt: "asc"
    }
  });

  return (
    <div>
      <div className="header  mb-3">
        <p className="text-xl font-bold">Created Courses</p>
        <div className="flex justify-between">
          <button>Sorted by created at</button>
          <Link href="/teach/course/create">
            <Button> Create Course </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {course.map((course, index) => {
          return (
            <Link
              key={course.id}
              className=""
              href={`/teach/course/${course.id}`}
            >
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
                  <div className="absolute top-0 right-0 m-1 p-1 px-2 rounded-2xl bg-slate-200 text-slate-600">
                    {course.isPublished ? (
                      <p className="text-xs">published</p>
                    ) : (
                      <p className="text-xs">unpublished</p>
                    )}
                  </div>
                </div>
                <div className="h-1/6 flex items-center bg-slate-200 p-1">
                  <p className="w-full h-full">
                    {index + 1}. {course.title}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CoursePage;
