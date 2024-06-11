"use client"

import { Course } from "@prisma/client";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface CourseSidebarProps {
  initialData: Course;
  completedFields: number;
  totalFields: number;
}
const CourseSidebar = ({
  initialData,
  completedFields,
  totalFields,
}: CourseSidebarProps) => {
  const router = useRouter();

  const onBack = () => {
    router.push("/teach/course")
  }

  return (
    <>
      <h1 className="text-2xl">Complete Your Course</h1>
      <div className="flex items-center text-slate-500 space-x-2 ">
        <button onClick={onBack} className="hover:text-black">
          <ArrowLeftCircle className="h-4 w-4" />
        </button>
        <p className="">{initialData.title}</p>
      </div>
      <p>Completed {`(${completedFields}/${totalFields})`} </p>
    </>
  );
};

export default CourseSidebar;
