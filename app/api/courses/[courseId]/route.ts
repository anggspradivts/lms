import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { userId } = auth();
  const { courseId } = params;
  const value = await req.json(); 
  
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const courseOwner = await db.course.findUnique({
    where: {
      id: courseId,
      userId: userId,
    }
  });

  if (!courseOwner) {
    return NextResponse.json({ message: "You're not the owner of this course." }, { status: 401 })
  }
    
  const course = await db.course.update({
    where: {
      id: courseId,
    },
    data: value
  });

  return NextResponse.json(course)
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId
      }
    })

    if (!courseOwner) {
      return NextResponse.json({ message: "You're not the owner of this course" }, { status: 401 })
    }

    const deleteCourse = await db.course.delete({
      where: {
        id: courseOwner.id
      }
    })

    return NextResponse.json(deleteCourse)
  } catch (error) {
    console.log("[DELETE_COURSE_ID]", error)
  }
}