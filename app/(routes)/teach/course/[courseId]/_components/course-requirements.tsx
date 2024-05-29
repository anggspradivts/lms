import { Course } from "@prisma/client";
import TitleFormPage from "./title-form";
import DescriptionForm from "./description-form";
import UploadImageForm from "./uploadimage-form";

interface CourseRquirementsProps {
  initialData: Course;
  userId: string;
}
const CourseRequirements = ({
  initialData,
  userId,
}: CourseRquirementsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <TitleFormPage initialData={initialData} userId={userId} />
      <DescriptionForm initialData={initialData} userId={userId}/>
      <UploadImageForm initialData={initialData} userId={userId} />
    </div>
  );
};

export default CourseRequirements;
