import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { coursesId: string } }
) {
  const value = await req.json();
  const { userId } = auth();
  const { coursesId } = params;
  
  const course = await db.course.update({
    where: {
      id: coursesId,
    },
    data: value
  })

  if(!userId) {
    throw new Error("Unauthorized");
  }

  return NextResponse.json(course)
}