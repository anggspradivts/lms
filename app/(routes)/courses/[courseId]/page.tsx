import { db } from "@/lib/db";
import CourseDetailPage from "./course-detail";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface PageProps {
  params: { courseId: string };
}
const Page = async ({ params }: PageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId, 
    },
    include: {
      chapters: {
        orderBy: {
          createdAt: "asc"
        }
      },
      chaptersFolders: {
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!course) {
    return (
      <div>
        No course was found
      </div>
    )
  }

  //find the course if it is bought or not
  const checkBought = await db.purchase.findFirst({
    where: {
      courseId: params.courseId,
      userId: userId
    },
  });

  return (
    <div>
      <CourseDetailPage initialData={course} checkBought={checkBought}/>
    </div>
  );
};

export default Page;
