"use client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

const CoursePage = () => {
  const router = useRouter();
  const pathname = usePathname();


  return (
    <div>
      this is course page where the teachers courses will be shown
      <div>
        <Button onClick={() => router.push("/teach/course/create")}>
          Create Course
        </Button>
      </div>
    </div>
  );
};

export default CoursePage;
