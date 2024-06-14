"use client";

import { Chapter, ChapterFolder, Course, Purchase } from "@prisma/client";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  const findChapterInFolder = initialData.chapters.filter(
    (chapter) => chapter.chapterFolderId === expandedFolderId
  );

  useEffect(() => {
    initialData.imageUrl && setCoursePreview(initialData.imageUrl);
  }, []);

  const handleFolderClick = (folderId: string) => {
    setExpandedFolderId((prevFolderId) =>
      prevFolderId === folderId ? null : folderId
    );
  };

  const handleCoursePreview = (url: string | null) => {
    setCoursePreview(url)
    console.log("ppp", url)
  }

  return (
    <div className="">
      <div className="course-header p-5 bg-slate-300 text-xl font-bold">
        <p>{initialData.title}</p>
      </div>
      <div className="grid md:grid-cols-3 p-4 gap-x-3">
        <div className="overflow-y-scroll max-h-[600px] col-span-2">
          <div className="h-[1000px]">
            <div className="img-sec flex justify-center py-10">
              {coursePreview ? (
                <div className="video-container">
                  <video controls className="w-full h-auto">
                    <source src={coursePreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <>
                  {initialData.imageUrl && (
                    <Image
                      src={initialData.imageUrl}
                      className=""
                      width={500}
                      height={700}
                      alt="course image"
                    />
                  )}
                </>
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
                              <div
                                key={chapter.id}
                                onClick={() =>
                                  handleCoursePreview(chapter.videoUrl)
                                }
                              >
                                <p
                                  key={chapter.id}
                                  className="border-b border-black text-sky-500"
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
        </div>
        <div className="col-span-1">enroll section</div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
