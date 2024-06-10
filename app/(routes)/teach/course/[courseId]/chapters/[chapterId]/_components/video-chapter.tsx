import { Chapter } from "@prisma/client";
import { PlayCircle, PlayIcon, Trash2 } from "lucide-react";

interface VideoChapterPageProps {
  initialData: Chapter | null;
  userId: string;
  courseId: string;
}
const VideoChapterPage = ({ initialData, userId, courseId }: VideoChapterPageProps) => {
  return (
    <div className="bg-slate-100 rounded-md p-2">
      {initialData?.videoUrl ? (
        <div>
          <video className="mb-2" width="600" controls>
            <source src={initialData?.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="flex items-center ">
            <PlayCircle className="w-6 h-6 mr-2"/>
            <h1 className="text-xl">Chapter Video</h1>
            <Trash2 className="ml-auto w-6 h-6" />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default VideoChapterPage;
