import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  const { userId } = auth();
  const { title } = await req.json()

  if(!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const course = await db.course.create({
    data: {
      userId,
      title
    }
  })

  return NextResponse.json(course)
}