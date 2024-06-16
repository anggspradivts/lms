import { Chapter, ChapterFolder, Course, Purchase } from "@prisma/client";
import { Info } from "lucide-react";

interface DescriptionSectionPageProps {
  initialData: Course & {
    chaptersFolders: ChapterFolder[];
    chapters: Chapter[];
  };
}
const DescriptionSectionPage = ({
  initialData,
}: DescriptionSectionPageProps) => {
  return (
    <div className="py-16">
      <div className="header flex items-center space-x-2 p-3">
        <p className="text-xl font-bold">About This Course</p>
        <Info />
      </div>
      <div className="p-3">
        <p>{initialData.description}</p>
      </div>
    </div>
  );
};

export default DescriptionSectionPage;
