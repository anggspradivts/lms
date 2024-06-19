"use client";
import TitleChapterFormPage from "@/app/(routes)/teach/course/[courseId]/chapters/[chapterId]/_components/title-chapter";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, ChapterFolder, Course, UserProgress } from "@prisma/client";
import axios from "axios";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  isCompleted: z.boolean(),
  chapterId: z.string(),
});

interface EnrolledIdPageProps {
  params: string;
  initialData: Course & {
    chapters: Chapter[];
    chaptersFolders: ChapterFolder[];
  };
  userProgress: UserProgress[];
}
const EnrolledIdPage = ({
  params,
  initialData,
  userProgress,
}: EnrolledIdPageProps) => {
  const [expandedFolderId, setExpandedFolderId] = useState<string | null>("");
  const [chapterDuration, setChapterDuration] = useState<number | null>(null);
  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [coursePreview, setCoursePreview] = useState<{
    url: string;
    title: string;
    description: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // isCompleted: false,
      chapterId: "",
    },
  });

  const findChapterInFolder = initialData.chapters.filter(
    (chapter) => chapter.chapterFolderId === expandedFolderId
  );

  useEffect(() => {
    // Initialize checkbox states based on user progress
    const initialCheckboxStates: { [key: string]: boolean } = {};
    userProgress.forEach((progress) => {
      initialCheckboxStates[progress.chapterId] = progress.isCompleted;
    });
    setCheckboxStates(initialCheckboxStates);
  }, [userProgress]);

  const handleLoadedMetadata = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const videoElement = event.currentTarget;
    const duration = Math.floor(videoElement.duration);
    setChapterDuration(duration);
  };

  const handleCoursePreview = (
    url: string | null,
    title: string | null,
    description: string | null
  ) => {
    if (url && title && description) {
      setCoursePreview({ url, title, description });
    } else {
      setCoursePreview(null); // Handle the case where URL is null
    }
  };

  const handleFolderClick = (folderId: string) => {
    setExpandedFolderId((prev) => (prev === folderId ? null : folderId));
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(
        `/api/courses/enrolled/${data.chapterId}`,
        data
      );
      console.log(res.data);
    } catch (error) {
      toast.error("Failed chapter completion...");
    }
  };

  const handleBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    chapterId: string
  ) => {
    const condition = event.target.checked;
    onSubmit({
      isCompleted: condition,
      chapterId: chapterId,
    });
  };

  return (
    <div>
      <div className="p-3 bg-black text-white">{initialData.title}</div>
      <div className="grid md:grid-cols-3 p-4 gap-x-10 md:min-h-[600px] md:max-h-[600px]">
        <div className="md:overflow-y-scroll md:max-h-[580px] md:col-span-2 p-2">
          <div className="img-sec flex justify-center">
            {coursePreview ? (
              <div className="course-container max-w-[700px]">
                <div className="flex items-center justify-between p-3 bg-black text-white ">
                  <p className="font-bold text-xl">{coursePreview.title}</p>
                  <p className="text-xs">{chapterDuration}</p>
                </div>
                <video
                  controls
                  className="w-auto h-auto"
                  onLoadedMetadata={handleLoadedMetadata}
                >
                  <source src={coursePreview.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="py-5">
                  <div className="flex py-4 md:pt-16 space-x-4 items-center text-sky-500">
                    <p className="text-xl font-bold ">About this Chapter</p>{" "}
                    <Info />
                  </div>
                  <div>
                    <p>{coursePreview.description}</p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Pariatur facere mollitia voluptate, quis nihil modi. Nobis
                    veritatis error quidem! Quaerat, eius et amet vero
                    blanditiis adipisci sed deserunt saepe non?
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex bg-slate-500 w-auto h-auto justify-center items-center">
                <p className="text-2xl font-bold">No Video Available</p>
              </div>
            )}
          </div>
        </div>
        <div className="md:cols-span-1 md:overflow-y-scroll md:max-h-[580px]">
          <div className="chapter-sec bg-slate-200">
            <p className="text-xl font-bold p-3 bg-black text-white">
              Course Module
            </p>
            <div className="space-y-1">
              {initialData.chaptersFolders.map((folder, index) => (
                <div key={folder.id}>
                  <div
                    key={folder.id}
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
                        {findChapterInFolder.map((chapter, index) => (
                          <div
                            className="flex items-center justify-between p-2 border border-slate-500"
                            key={chapter.id}
                            onClick={() =>
                              handleCoursePreview(
                                chapter.videoUrl,
                                chapter.title,
                                chapter.description
                              )
                            }
                          >
                            <p
                              key={chapter.id}
                              className={cn(
                                "",
                                chapter.title === coursePreview?.title &&
                                  "text-sky-500"
                              )}
                            >
                              {index + 1}. {chapter.title}
                            </p>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                              <input
                                className="bg-sky-500"
                                type="checkbox"
                                {...form.register("isCompleted")}
                                onChange={(event) =>
                                  handleBoxChange(event, chapter.id)
                                }
                                checked={
                                  checkboxStates[chapter.id] || false
                                }
                              />
                            </form>
                          </div>
                        ))}
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
    </div>
  );
};

export default EnrolledIdPage;
