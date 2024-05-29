import { auth } from "@clerk/nextjs/server"

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { value } = await req.json();
  const { userId } = auth();
  const { courseId } = params;
  console.log(courseId)
  console.log(value)

  if(!userId) {
    throw new Error("Unauthorized");
  }


}