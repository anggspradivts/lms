"use client";

import { Button } from "@/components/ui/button";
import { Chapter, ChapterFolder, Course, Purchase } from "@prisma/client";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EnrollSectionPage from "./_components/enroll-section";
import DescriptionSectionPage from "./_components/description-section";

interface CourseDetailPageProps {
  initialData: Course & {
    chaptersFolders: ChapterFolder[];
    chapters: Chapter[];
  };
  checkBought: Purchase | null;
}
const CourseDetailPage = ({
  initialData,
  checkBought,
}: CourseDetailPageProps) => {
  const [coursePreview, setCoursePreview] = useState<string | null>(null);
  const [expandedFolderId, setExpandedFolderId] = useState<string | null>(null);

  const router = useRouter();

  const findChapterInFolder = initialData.chapters.filter(
    (chapter) => chapter.chapterFolderId === expandedFolderId
  );

  const handleFolderClick = (folderId: string) => {
    setExpandedFolderId((prevFolderId) =>
      prevFolderId === folderId ? null : folderId
    );
  };

  const handleCoursePreview = (url: string | null) => {
    setCoursePreview(url);
  };

  return (
    <div className="">
      <div className="course-header p-5 bg-slate-300 text-xl font-bold">
        <p>{initialData.title}</p>
      </div>
      <div className="grid md:grid-cols-3 p-4 gap-x-10">
        <div className="md:overflow-y-scroll md:max-h-[600px] md:col-span-2 p-2">
          <div>
            <div className="img-sec flex justify-center py-10">
              {coursePreview !== null && coursePreview !== undefined ? (
                <div className="video-container">
                  <video controls className="w-[700px] h-auto">
                    <source src={coursePreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div>{/* <p>{}</p> */}</div>
                </div>
              ) : (
                initialData.imageUrl && (
                  <Image
                    src={initialData.imageUrl}
                    className=""
                    width={700}
                    height={500}
                    alt="course image"
                  />
                )
              )}
            </div>
            <div className="chapter-sec bg-slate-200">
              <p className="text-xl font-bold p-3 bg-black text-white">
                Course Module
              </p>
              <div className="space-y-1">
                {initialData.chaptersFolders.map((folder, index) => (
                  <div key={folder.id}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handleFolderClick(folder.id)}
                      className="p-3 bg-slate-300 flex items-center justify-between cursor-pointer"
                    >
                      {index + 1}. {folder.title}
                      {expandedFolderId === folder.id ? (
                        <ChevronDown />
                      ) : (
                        <ChevronRight />
                      )}
                    </div>
                    {expandedFolderId === folder.id &&
                      (findChapterInFolder && findChapterInFolder.length > 0 ? (
                        <div className="pl-6 space-y-2 ">
                          {findChapterInFolder.map((chapter, index) =>
                            chapter.isFree ? (
                              <div key={chapter.id}>
                                <p
                                  key={chapter.id}
                                  className="border-b border-black text-sky-500"
                                  onClick={() =>
                                    handleCoursePreview(chapter.videoUrl)
                                  }
                                >
                                  {index + 1}. {chapter.title}
                                </p>
                              </div>
                            ) : (
                              <p
                                key={chapter.id}
                                className="border-b border-black"
                              >
                                {index + 1}. {chapter.title}
                              </p>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="pl-6">
                          <p>No chapters found in this folder</p>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DescriptionSectionPage initialData={initialData} />
        </div>
        <EnrollSectionPage initialData={initialData} checkBought={checkBought}/>
      </div>
    </div>
  );
};

export default CourseDetailPage;
