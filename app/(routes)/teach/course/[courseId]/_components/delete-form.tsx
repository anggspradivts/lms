"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil } from "lucide-react";

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
  }),
});

interface DeleteFormPageProps {
  initialData: Course;
  userId: string;
}
const DeleteFormPage = ({ initialData, userId }: DeleteFormPageProps) => {
  const [isEditing, setIsEditting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
    },
  });

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`/api/courses/${initialData.id}`);
      router.push("/teach/course");
      router.refresh();
      toast.success("Course deleted.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn("bg-slate-100 rounded-md p-2", isEditing && "bg-slate-200")}
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-xl">Delete this course</h1>
      </div>
      <div className="flex justify-end">
        <Button variant="destructive" onClick={onDelete}>
          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default DeleteFormPage;
