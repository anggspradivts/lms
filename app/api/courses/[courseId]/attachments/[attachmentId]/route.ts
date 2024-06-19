import { db } from "@/lib/db";
import { utapi } from "@/lib/uploadthing";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    console.log("success go to api route")
    const { userId } = auth()
    const { courseId, attachmentId } = params;
    console.log("anjay", attachmentId);


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

    //delete from databsae
    const attachment = await db.attachment.delete({
      where: {
        id: attachmentId
      }
    })

    //find file name that gonna be deleted
    const findFile = await db.attachment.findUnique({
      where: {
        id: attachmentId
      }
    });

    //delete file
    const deleteFile = await utapi.deleteFiles(`${findFile?.name}`);

    return NextResponse.json(deleteFile)
  } catch (error) {
    console.log("[COURSE_ID_ATTACHMENTS]", error);
    return new NextResponse("Internal server error", { status: 500 })
  }
}