import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const ChaptersPage = async (
  { params }: { params: { courseId: string } }
) => {
  console.log(params.courseId)

  const { userId } =  auth();

  if (!userId) return 

  const chapter = await db.chapter.findMany({
    where: {
      courseId: params.courseId,
    }
  })

  return ( 
    <div>

    </div>
   );
}
 
export default ChaptersPage;