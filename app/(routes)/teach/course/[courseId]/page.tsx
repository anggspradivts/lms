// "use client"

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect, useRouter } from "next/navigation";
import CourseRequirements from "./_components/course-requirements";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import { Attachment, Course } from "@prisma/client";
import RequirementsHeader from "./_components/requirements-header";
import CourseSidebar from "./_components/course-sidebar";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  // const router = useRouter();
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      chaptersFolders: {
        orderBy: {
          position: "asc",
        },
      },
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.price,
    course.imageUrl,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="border-r border-gray md:col-span-1 w-full">
        <CourseSidebar
          initialData={course}
          completedFields={completedFields}
          totalFields={totalFields}
        />
      </div>
      <div className="col-span-3">
        <RequirementsHeader
          initialData={course}
          // userId={userId}
          // categories={categories}
          params={params}
        />
        <CourseRequirements
          initialData={course}
          userId={userId}
          categories={categories}
          params={params}
        />
      </div>
    </div>
  );
};

export default CourseIdPage;
