"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, ToggleLeft, ToggleRight } from "lucide-react";

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

const formSchema = z.object({
  isPublished: z.boolean(),
});

interface IsPublishedPageProps {
  initialData: Chapter | null;
  userId: string;
  courseId: string;
}
const IsPublishedPage = ({
  initialData,
  userId,
  courseId,
}: IsPublishedPageProps) => {
  const [isEditing, setIsEditting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isPublished: initialData?.isPublished,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(
        `/api/courses/${initialData?.id}`,
        value
      );
      setIsEditting((prev) => !prev);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn(
        "bg-slate-100 rounded-md p-2",
        isEditing && "bg-slate-200 shadow-inner"
      )}
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-xl">Is this chapter published</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  {!initialData?.isPublished && (
                    <Button
                      variant="ghost"
                      type="submit"
                      className="bg-transparent"
                      disabled={isSubmitting}
                      onClick={() => {
                        form.setValue("isPublished", true);
                      }}
                    >
                      <ToggleLeft className="w-10 h-10" />
                    </Button>
                  )}
                  {initialData?.isPublished && (
                    <Button
                      variant="ghost"
                      type="submit"
                      className="bg-transparent"
                      disabled={isSubmitting}
                      onClick={() => {
                        form.setValue("isPublished", false);
                      }}
                    >
                      <ToggleRight className="w-10 h-10 text-sky-500" />
                    </Button>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div>
        {!initialData?.isPublished && (
          <p className="text-sm text-slate-500">
            This chapter is not published yet
          </p>
        )}
        {initialData?.isPublished && (
          <p className="text-sm text-slate-500">
            This chapter is published, accessible to every user
          </p>
        )}
      </div>
    </div>
  );
};

export default IsPublishedPage;
