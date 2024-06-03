import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth()
    const { courseId, attachmentId } = params;  

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId
      }
    })

    if(!course) {
      return NextResponse.json({ message: "You're not the course owner." }, { status: 401 })
    }

    const attachment = await db.attachment.delete({
      where: {
        id: attachmentId
      }
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.log("[COURSE_ID_ATTACHMENTS]", error);
    return new NextResponse("Internal server error", { status: 500 })
  }
}