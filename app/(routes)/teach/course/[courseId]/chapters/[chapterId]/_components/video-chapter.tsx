"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { Pencil, PlayCircle, PlayIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface VideoChapterPageProps {
  initialData: Chapter | null;
  userId: string;
  courseId: string;
}
const VideoChapterPage = ({
  initialData,
  userId,
  courseId,
}: VideoChapterPageProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false)

  const formSchema = z.object({
    videoUrl: z.string().min(1, {
      message: "video is required"
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      videoUrl: ""
    }
  });

  const { isSubmitting } = form.formState;
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${initialData?.id}`,
        value
      );
      toast.success("Success editing video chapter!");
      // router.refresh(); //doesnt work
      location.reload()
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="bg-slate-100 rounded-md p-2">
      {!isEditting ? (
        initialData?.videoUrl && (
          <div>
            <video className="mb-2" width="600" controls>
              <source src={initialData?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex items-center ">
              <PlayCircle className="w-6 h-6 mr-2" />
              <h1 className="text-xl">Chapter Video</h1>
              <button
                className="ml-auto bg-transparent"
                onClick={() => {
                  setIsEditting(true);
                }}
              >
                <Pencil className="w-5 h-5" />
              </button>
            </div>
          </div>
        )
      ) : (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FileUpload
                      endpoint="chapterVideo"
                      onChange={(videoUrl) => {
                        if (videoUrl) {
                          form.setValue("videoUrl", videoUrl);
                          setIsUploaded(true)
                        }
                      }}
                    />
                    {isUploaded && <p className="text-sm text-slate-500">File uploaded, click save...</p>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="flex pt-2 justify-between items-center">
              <Button
                variant="destructive"
                onClick={() => setIsEditting(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={isSubmitting}
                variant="outline"
                type="submit"
              >
                Save
              </Button>
            </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default VideoChapterPage;
