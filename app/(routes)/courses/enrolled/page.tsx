import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EnrolledPage from "./EnrolledPage";

const EnrolledCoursePage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/")
  }
  
  const enrolledCourse = await db.purchase.findMany({
    where: {
      userId: userId,
    },
  });

  const enrolledCourseIds = enrolledCourse.map((course) => course.courseId);

  if (!enrolledCourse) {
    console.log("You didnt enroll any course")
  };

  const course = await db.course.findMany({
    where: {
      userId: userId,
      id: {
        in: enrolledCourseIds
      }
    },
  })

  return ( 
    <div className="min-h-screen">
      <EnrolledPage initialData={course} />
    </div>
   );
}
 
export default EnrolledCoursePage;