import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || "";

    const findCourse = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          search: q,
        }
      }
    });

    return NextResponse.json(findCourse);
  } catch (error) {
    console.log("[ERR_SEARCH_API]", error)
  }
}