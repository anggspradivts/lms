import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const EnrolledCoursePage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/")
  }
  
  const enrolledCourse = await db.course.findMany({
    where: {
      userId: userId
    }
  })

  return ( 
    <div className="min-h-screen">
      fetch all enrolled course id based on userid enrolled id
    </div>
   );
}
 
export default EnrolledCoursePage;