import { auth } from "@clerk/nextjs/server";
import EnrolledIdPage from "./EnrolledPage";
import { notFound, redirect, useRouter } from "next/navigation";
import { db } from "@/lib/db";

interface LecturePageProps {
  params: { enrolledId: string }; //enrolledId === courseId
}
const LecturePage = async ({ params }: LecturePageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/")
  }

  //check the course if it is bought or not by the userID
  const checkBought = await db.purchase.findUnique({
    where: {
      id: params.enrolledId,
      userId: userId
    },
  });

  if (!checkBought) {
    throw new Error("You have not purchased this course")
  }

  const course = await db.course.findUnique({
    where: {
      id: checkBought.courseId, 
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
    notFound();
  }

  return (
    <div>
      <EnrolledIdPage initialData={course} params={params.enrolledId}/>
    </div>
  );
};

export default LecturePage;