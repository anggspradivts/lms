"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Pencil, PlusCircle, Save } from "lucide-react";
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

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

interface ChapterFormProps {
  initialData: Course;
  userId: string;
}
const ChapterForm = ({ initialData, userId }: ChapterFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
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
        `/api/courses/${initialData.id}`,
        value
      );
      setIsAdding((prev) => !prev);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn("bg-slate-100 rounded-md p-2", isAdding && "bg-slate-200")}
    >
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-xl">Course Chapter</h1>
        {!isAdding ? (
          <Button variant="ghost" onClick={() => setIsAdding((prev) => !prev)}>
            New chapter
          </Button>
        ) : (
          <Button variant="ghost" onClick={() => setIsAdding((prev) => !prev)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        )}
      </div>
      {!isAdding ? (
        <div className="chapter-field space-y-2">
          <div className="h-10 flex items-center bg-slate-200 rounded-lg px-3">
            Chapter 1
          </div>
          <div className="h-10 flex items-center bg-slate-200 rounded-lg px-3">
            Chapter 1
          </div>
          <div className="h-10 flex items-center bg-slate-200 rounded-lg px-3">
            Chapter 1
          </div>
          <div className="h-10 flex items-center bg-slate-200 rounded-lg px-3">
            Chapter 1
          </div>
          <div className="h-10 flex items-center bg-slate-200 rounded-lg px-3">
            Chapter 1
          </div>
        </div>
      ) : (
        <div>
          {null}
        </div>
      )}
    </div>
  );
};

export default ChapterForm;
