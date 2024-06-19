import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse, userAgent } from "next/server";

export async function PATCH(
  req: Request, 
  { params }: { params: { enrolledId: string } }
) {
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    };

    const checkUserProgress = await db.userProgress.findFirst({
      where: {
        chapterId: params.enrolledId,
        userId: userId,
      }
    });

    console.log("value", data);

    let userProgress;

    if (!checkUserProgress) {
      //create user progress
      userProgress = await db.userProgress.create({
        data: {
          userId: userId,
          chapterId: params.enrolledId,
          isCompleted: data.isCompleted
        }
      })
      return NextResponse.json(userProgress)
    } else {
      //update user progress
      userProgress = await db.userProgress.delete({
        where: {
          id: checkUserProgress.id
        }
      })
      return NextResponse.json(userProgress)
    }
    
  } catch (error) {
    console.log("[ENROLLED_ID_ERR]", error)
  }
}