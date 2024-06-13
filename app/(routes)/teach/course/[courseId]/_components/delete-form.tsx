"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, Loader2, Pencil } from "lucide-react";

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
  const [isModalShow, setIsModalShow] = useState(false);
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
    <div className={cn("bg-slate-100 rounded-md p-2")}>
      <div className="flex items-center text-red-700 space-x-2">
        <AlertCircle className="w-6 h-6" />
        <h1 className="text-xl">Delete this course</h1>
      </div>
      <div className="flex justify-end">
        <Button variant="destructive" onClick={() => setIsModalShow(true)}>
          Delete
        </Button>
        {isModalShow && (
          <div className="modal-overlay fixed top-0 left-0 right-0 bottom-0 z-[1000] flex items-center justify-center bg-black bg-opacity-35">
            <div className="modal-content relative bg-slate-100 w-5/6 md:w-3/6 p-4 rounded-lg space-y-10">
              <div className="modal-header flex items-center space-x-2 text-red-700">
                <p className="text-xl md:text-3xl">Warning</p>
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="modal-text">
                This action cannot be undone, are you sure want to delete this
                course? {" "}
                <span className="text-slate-400 text-sm">click <span className="text-red-700">delete</span> to continue</span>
              </div>
              <div className="flex justify-end items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsModalShow(false);
                  }}
                  className=""
                >
                  Cancel
                </Button>
                <Button onClick={onDelete} variant="destructive">
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteFormPage;
