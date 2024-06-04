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
    const { title, url } = await req.json()
  
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

    console.log("url", url, title)

    // const lastChapter = await db.chapter.findFirst({
    //   where: {
    //     courseId: courseId,
    //   },
    //   orderBy: {
    //     position: "desc"
    //   }
    // })

    // const newPosition = lastChapter ? lastChapter.position + 1 : 1;
  
    // const chapter = await db.chapter.create({
    //   data: {
    //     courseId: courseId,
    //     title: title,
    //     position: newPosition
    //   }
    // })

    // return NextResponse.json(chapter)
  } catch (error) {
    console.log("[INTERNAL_SERVER_ERR]", error)
  }
}