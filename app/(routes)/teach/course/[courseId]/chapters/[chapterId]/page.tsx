import { auth } from "@clerk/nextjs/server";
import ChapterDetail from "./ChapterDetail";
import { db } from "@/lib/db";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";


const ChapterDetailPage = async (
  { params } : { params: { courseId: string, chapterId: string } } 
) => {
  const { userId } = auth();
  // const router = useRouter()

  if (!userId) return 

  const courseOwner = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: userId,
    }
  })

  if (!courseOwner) return 

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    }
  })
  
  return (
    <div>
      <ChapterDetail initialData={chapter} userId={userId} courseId={params.courseId}/>
    </div>
   );
}
 
export default ChapterDetailPage;