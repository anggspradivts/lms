import { Chapter } from "@prisma/client";
import TitleChapterFormPage from "./_components/title-chapter";
import DescriptionChapterPage from "./_components/description-chapter";
import IsFreePage from "./_components/isfree-chapter";
import IsPublishedPage from "./_components/ispublished-chapter";
import VideoChapterPage from "./_components/video-chapter";

interface ChapterDetailProps {
  initialData: Chapter | null;
  userId: string;
  courseId: string;
}
const ChapterDetail = async ({ initialData, userId, courseId }: ChapterDetailProps) => {
  return (
    <div className="grid md:grid-cols-4">
      <div className="">

      </div>
      <div className="col-span-3">
        <div className="flex items-center mb-3">
          <h1 className="text-2xl">Edit Chapter</h1>
        </div>
        <div className="grid md:grid-cols-2 md:space-x-5 space-y-5 md:space-y-0 ">
          <div className="flex flex-col gap-5">
            <TitleChapterFormPage initialData={initialData} userId={userId} courseId={courseId}/>
            <DescriptionChapterPage initialData={initialData} userId={userId} courseId={courseId}/>
            <IsFreePage initialData={initialData} userId={userId} courseId={courseId}/>
            <IsPublishedPage initialData={initialData} userId={userId} courseId={courseId}/>
          </div>
          <div className="flex flex-col gap-5">
            <VideoChapterPage initialData={initialData} userId={userId} courseId={courseId}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetail;
