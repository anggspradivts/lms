"use server"
import { utapi } from "@/lib/uploadthing"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export const deleteFile = async (url: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    
  } catch (error) {
    
  }
  await utapi.deleteFiles(url)
}