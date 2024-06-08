"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  })
});

interface TitleChapterFormPageProps {
  initialData: Chapter | null;
  userId: string;
  courseId: string;
}
const TitleChapterFormPage = ({ initialData, userId, courseId }: TitleChapterFormPageProps) => {
  const [isEditing, setIsEditting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
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
      toast.success("Success updating chapter!")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn("bg-slate-100 rounded-md p-2", isEditing && "bg-slate-200 shadow-inner")}
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-xl">Chapter title</h1>
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
            <p className="text-sm text-slate-500">{initialData?.title}</p>
          </>
        ) : (
          <Form {...form}>
            <form className="mt-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapter Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'advanced web development'"
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

export default TitleChapterFormPage;
