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
import { title } from "process";

const formSchema = z.object({
  isFree: z.boolean(),
});

interface IsFreePageProps {
  initialData: Chapter | null;
  courseId: string;
  userId: string;
}
const IsFreePage = ({ initialData, userId, courseId }: IsFreePageProps) => {
  const [isEditing, setIsEditting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: initialData?.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log(value)
    try {
      const response = await axios.patch(
        `/api/courses/${courseId}/chapters/${initialData?.id}`,
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
        // isEditing && "bg-slate-200 shadow-inner"
      )}
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-xl">Is this chapter free</h1>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem>
                  {!initialData?.isFree && (
                    <Button
                      variant="ghost"
                      type="submit"
                      className="bg-transparent"
                      disabled={isSubmitting}
                      onClick={() => {
                        form.setValue("isFree", true);
                      }}
                    >
                      <ToggleLeft className="w-10 h-10" />
                    </Button>
                  )}
                  {initialData?.isFree && (
                    <Button
                      variant="ghost"
                      type="submit"
                      className="bg-transparent"
                      disabled={isSubmitting}
                      onClick={() => {
                        form.setValue("isFree", false);
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
        {initialData?.isFree && (
          <p className="text-sm text-slate-500">
            This chapter is free, accessible to every user
          </p>
        )}
        {!initialData?.isFree && (
          <p className="text-sm text-slate-500">This chapter is not free</p>
        )}
      </div>
    </div>
  );
};

export default IsFreePage;
