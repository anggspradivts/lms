import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CoursesPage from "./CoursesPage";

const page = async () => {

  const { userId } = auth();

  if (!userId) {
    redirect("/")
  }

  const category = await db.category.findMany({
    take: 6
  });

  console.log(category);

  return (
    <div>
      <CoursesPage category={category} />
    </div>
  );
};

export default page;
