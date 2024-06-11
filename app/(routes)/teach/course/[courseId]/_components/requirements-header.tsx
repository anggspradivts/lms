"use client"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import toast from "react-hot-toast";
import { Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  isPublished: z.boolean(),
});

interface RequirementsHeaderProps {
  initialData: Course,
  params: { courseId: string }
}
const RequirementsHeader = ({
  initialData,
  params
}: RequirementsHeaderProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      console.log(value)
      await axios.patch(`/api/courses/${params.courseId}`, value);
      value.isPublished ? toast.success("Course successfuly published!") : toast.success("Course successfuly unpublished.")
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="flex justify-between ">
      <h1 className="text-2xl mb-5">
        Course Requirements
        <span className="text-xs ml-6 p-2 text-slate-500 bg-sky-100 rounded-xl">
          {!initialData.isPublished ? "unpublished" : "published"}
        </span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem>
                {!initialData.isPublished && (
                  <Button
                    variant="ghost"
                    type="submit"
                    className="bg-transparent"
                    disabled={form.formState.isSubmitting}
                    onClick={() => {
                      form.setValue("isPublished", true);
                    }}
                  >
                    Publish
                  </Button>
                )}
                {initialData.isPublished && (
                  <Button
                    variant="ghost"
                    type="submit"
                    className="bg-transparent"
                    disabled={form.formState.isSubmitting}
                    onClick={() => {
                      form.setValue("isPublished", false);
                    }}
                  >
                    Unpublish
                  </Button>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default RequirementsHeader;
