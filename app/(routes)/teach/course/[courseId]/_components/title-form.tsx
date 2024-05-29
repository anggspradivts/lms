"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

interface TitleFormPageProps {
  initialData: Course;
  userId: string;
}
const TitleFormPage = ({ initialData, userId }: TitleFormPageProps) => {
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
        `/api/courses/${initialData.id}`,
        value
      );
      setIsEditting((prev) => !prev);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-100 rounded-md p-2">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl">Course title</h1>
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
            <p>{initialData.title}</p>
            <p className="text-xs text-gray-600">Title is required</p>
          </>
        ) : (
          <Form {...form}>
            <form className="mt-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'advanced web development'"
                        {...field}
                      />
                    </FormControl>
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

export default TitleFormPage;
