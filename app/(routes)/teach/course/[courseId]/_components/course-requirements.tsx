import { Category, Course } from "@prisma/client";
import TitleFormPage from "./title-form";
import DescriptionForm from "./description-form";
import UploadImageForm from "./uploadimage-form";
import { CategoryForm } from "./category-form";

interface CourseRquirementsProps {
  initialData: Course;
  userId: string;
  categories: { id: string, name: string }[];
}
const CourseRequirements = ({
  initialData,
  userId,
  categories,
}: CourseRquirementsProps) => {

  //Map over each categories value (id, name), and save it inside label and value
  const options = categories.map((category) => ({
    label: category.name,
    value: category.id
  }))

  
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <TitleFormPage initialData={initialData} userId={userId} />
      <DescriptionForm initialData={initialData} userId={userId} />
      <UploadImageForm initialData={initialData} userId={userId} />
      <div className="grid grid-cols-1 gap-5">
        <CategoryForm
          initialData={initialData}
          userId={userId}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
        <CategoryForm
          initialData={initialData}
          userId={userId}
          options={options}
        />
      </div>
    </div>
  );
};

export default CourseRequirements;
