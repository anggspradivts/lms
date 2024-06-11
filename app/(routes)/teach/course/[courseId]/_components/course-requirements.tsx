import {
  Attachment,
  Category,
  Chapter,
  ChapterFolder,
  Course,
} from "@prisma/client";
import TitleFormPage from "./title-form";
import DescriptionForm from "./description-form";
import UploadImageForm from "./uploadimage-form";
import { CategoryForm } from "./category-form";
import PriceForm from "./price-form";
import ChapterForm from "./chapter-form";
import AttachmentForm from "./attachment-form";
import DeleteFormPage from "./delete-form";

interface CourseRquirementsProps {
  initialData: Course & {
    attachments: Attachment[];
    chapters: Chapter[];
    chaptersFolders: ChapterFolder[];
  };
  userId: string;
  categories: { id: string; name: string }[];
  params: { courseId: string }
}
const CourseRequirements = ({
  initialData,
  userId,
  categories,
  params,
}: CourseRquirementsProps) => {
  //Map over each categories value (id, name), and save it inside label and value
  const options = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="first-sec flex flex-col gap-5">
        <TitleFormPage initialData={initialData} userId={userId} />
        <DescriptionForm initialData={initialData} userId={userId} />
        <UploadImageForm initialData={initialData} userId={userId} />
        <CategoryForm
          initialData={initialData}
          userId={userId}
          options={options}
        />
      </div>
      <div className="second-sec flex flex-col gap-5">
        <ChapterForm initialData={initialData} userId={userId} params={params}/>
        <AttachmentForm initialData={initialData} userId={userId} />
        <PriceForm initialData={initialData} userId={userId} />
        <DeleteFormPage initialData={initialData} userId={userId} />
      </div>
    </div>
  );
};

export default CourseRequirements;
