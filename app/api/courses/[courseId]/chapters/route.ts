import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const { title, videoUrl, creationState, chapterFolderId } = await req.json()
  
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
  
    if (!courseId) return NextResponse.json({ message: "Course not found" }, { status: 500 })
  
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      }
    })
  
    if (!courseOwner) {
      return NextResponse.json({ message: "You're not the owner of this course." }, { status: 401 })
    }


    if (creationState === "chapter") {//make chapter
      const lastChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
        },
        orderBy: {
          position: "desc"
        }
      })

      const newPosition = lastChapter ? lastChapter.position + 1 : 1;

      const chapter = await db.chapter.create({
        data: {
          courseId: courseId,
          title: title,
          videoUrl: videoUrl,
          position: newPosition,
          chapterFolderId: chapterFolderId
        }
      })
      return NextResponse.json(chapter)
    } else if (creationState === "folder") {//make folder
      const lastFolder = await db.chapterFolder.findFirst({
        where: {
          courseId: courseId,
        },
        orderBy: {
          position: "desc"
        }
      })

      const lastFolderPosition = lastFolder ? lastFolder.position + 1 : 1;

      const folder = await db.chapterFolder.create({
        data: {
          courseId: courseId,
          title: title,
          position: lastFolderPosition
        }
      })

    return NextResponse.json(folder)
    } else {
      return NextResponse.json({ message: "No creation state was passed from the client" }, { status: 500 })
    }
  } catch (error) {
    console.log("[INTERNAL_SERVER_ERR]", error)
  }
}