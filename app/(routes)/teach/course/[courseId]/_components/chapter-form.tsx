"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/file-upload";
import { deleteFile } from "@/components/file-delete";
import { PlusCircle, Trash2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";



interface ChapterFormProps {
  initialData: Course & { chapters: Chapter[] };
  userId: string;
}
const ChapterForm = ({ initialData, userId }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [creationState, setCreationState] = useState("");
  const [isUrl, setIsUrl] = useState("");
  const router = useRouter();
  
  const formSchema = z.object({
    title: z.string().min(1),
    url: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const formFolder = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  // const { isSubmitting, isValid } = formFolder.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${initialData.id}/chapters`, value);
      toast.success("Chapter created.");
      setIsCreating((prev) => !prev);
      router.refresh();
    } catch {
      toast.error("Something went wrong...");
    }
  };

  

  const handleCreate = (create: string) => {
    setIsCreating((prev) => !prev);
    setCreationState(create);
  };

  const handleFileDelete = (url: string) => {
    deleteFile(url);
    setIsUrl("");
  };

  return (
    <div
      className={cn(
        "bg-slate-100 rounded-md p-2",
        isCreating && "bg-slate-200"
      )}
    >
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-xl">Course Chapters</h1>
        {!isCreating ? (
          <div>
            <Button variant="ghost" onClick={() => handleCreate("folder")}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Folder
            </Button>
            <Button variant="ghost" onClick={() => handleCreate("chapter")}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New chapter
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            onClick={() => {
              setIsCreating((prev) => !prev);
              setCreationState("");
            }}
          >
            Cancel
          </Button>
        )}
      </div>
      {isCreating ? (
        <>
          {creationState === "chapter" && (
            <Form {...form}>
              <form className="mt-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormLabel>Chapter Title</FormLabel>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g 'Introduction to the course'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel>Chapter Video</FormLabel>
                  <FileUpload
                    endpoint="courseAttachment"
                    onChange={(url) => {
                      if (url) {
                        setIsUrl(url);
                        form.setValue("url", url);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center text-sm">
                  <p>
                    {isUrl
                      ? isUrl.slice(0, 50) + "..."
                      : "No video uploaded..."}
                  </p>
                  {isUrl && (
                    <Trash2
                      onClick={() => handleFileDelete(isUrl)}
                      className="ml-auto w-4 h-4"
                    />
                  )}
                </div>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          )}
          {creationState === "folder" && <div>make folder</div>}
        </>
      ) : (
        <div
          className={cn(
            "",
            initialData.chapters.length === 0 && "text-sm text-slate-500 italic"
          )}
        >
          {initialData.chapters.length > 0 ? (
            <div className="space-y-2">
              {initialData.chapters.map((chapter) => (
                <div key={chapter.id} className="bg-slate-200 p-1 rounded-md">
                  {chapter.title}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No chapters available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterForm;
