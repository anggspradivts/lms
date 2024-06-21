import { db } from "@/lib/db";
import CategoryIdPage from "./CategoryIdPage";

const page = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = params;

  const courseByCatId = await db.course.findMany({
    where: {
      categoryId: categoryId
    }
  });

  const category = await db.category.findUnique({
    where: {
      id: categoryId
    }
  })

  return (
    <div className="p-4">
      <CategoryIdPage course={courseByCatId} category={category} />
    </div>
  );
};

export default page;
