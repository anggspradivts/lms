"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const formSchema = z.object({
  description: z.string(),
});

interface DescriptionChapterPageProps {
  initialData: Chapter | null;
  userId: string;
  courseId: string;
}
const DescriptionChapterPage = ({ initialData, userId, courseId }: DescriptionChapterPageProps) => {
  const [isEditing, setIsEditting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(
        `/api/courses/${courseId}/chapters/${initialData?.id}`,
        value
      );
      setIsEditting((prev) => !prev);
      router.refresh();
      toast.success("Success updating chapter description!")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn("bg-slate-100 rounded-md p-2", isEditing && "bg-slate-200")}
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-xl">Chapter description</h1>
        {!isEditing && (
          <Button
            variant="ghost"
            onClick={() => setIsEditting((prev) => !prev)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
        {isEditing && (
          <Button
            variant="ghost"
            onClick={() => setIsEditting((prev) => !prev)}
          >
            Cancel
          </Button>
        )}
      </div>
      <div>
        {!isEditing ? (
          <>
            <p className="text-sm text-slate-500">
              {initialData?.description || "No Description"}
            </p>
          </>
        ) : (
          <Form {...form}>
            <form className="mt-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="description about your course..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto mt-2">
                <Button
                  variant="outline"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default DescriptionChapterPage;
