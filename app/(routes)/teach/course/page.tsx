import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const CoursePage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div>
      this is course page where the teachers courses will be shown
      <div className="flex space-x-3">
        {course.map((course) => {
          return (
            <div key={course.id}>
              <Link href={`/teach/course/${course.id}`}>
                <p className="bg-sky-300">{course.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <Link href="/teach/course/create">
        <Button> Create Course </Button>
      </Link>
    </div>
  );
};

export default CoursePage;
