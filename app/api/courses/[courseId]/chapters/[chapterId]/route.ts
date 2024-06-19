import { db } from "@/lib/db";
import { utapi } from "@/lib/uploadthing";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string, chapterId: string } }
) {
  try {
    const { userId } = auth();
    const value = await req.json()

    if(!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId
      }
    })

    
    if (!courseOwner) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
      
    //find chapter that want to be deleted
    const findChapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId
      }
    });

    //delete chapter video
    if (findChapter?.videoUrl) {
      await utapi.deleteFiles(`${findChapter.videoUrl}`);
      console.log("deleted")
    }

    //update chapter
    const updateChapter = await db.chapter.update({
      where: {
        id: params.chapterId
      },
      data: value
    })

     
    return NextResponse.json(updateChapter)
  } catch (error) {
    console.log("[INTERNAL_SERVER_ERR]", error)
  }
}