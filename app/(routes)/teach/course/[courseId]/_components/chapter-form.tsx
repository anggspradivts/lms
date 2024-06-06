"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Chapter, ChapterFolder, Course } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/file-upload";
import { deleteFile } from "@/components/file-delete";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  Plus,
  PlusCircle,
  Trash2,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface ChapterFormProps {
  initialData: Course & {
    chapters: Chapter[];
    chaptersFolders: ChapterFolder[] & { chapters: Chapter[] };
  };
  userId: string;
}
const ChapterForm = ({ initialData, userId }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [creationState, setCreationState] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isChapterShow, setIsChapterShow] = useState<string | null>(null);
  const router = useRouter();

  const formSchemaA = z.object({
    videoUrl: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    creationState: z.string(),
    chapterFolderId: z.string().min(1),
  });
  const formSchemaB = z.object({
    title: z.string().min(1),
    creationState: z.string(),
  });

  const formChapter = useForm<z.infer<typeof formSchemaA>>({
    resolver: zodResolver(formSchemaA),
    defaultValues: {
      title: "",
      videoUrl: "",
      description: "",
      chapterFolderId: "",
      creationState: "chapter",
    },
  });
  const formFolder = useForm<z.infer<typeof formSchemaB>>({
    resolver: zodResolver(formSchemaB),
    defaultValues: {
      title: "",
      creationState: "folder",
    },
  });

  const onSubmit = async (
    value: z.infer<typeof formSchemaA> | z.infer<typeof formSchemaB>
  ) => {
    console.log("v", value);
    try {
      await axios.post(`/api/courses/${initialData.id}/chapters`, value);
      value.creationState === "chapter"
        ? toast.success("Chapter created.")
        : toast.success("Folder created.");
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
    setVideoUrl("");
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
              <Folder className="h-4 w-4 mr-2" />
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

      {/* make chapter sec */}
      {isCreating ? (
        <>
          {creationState === "chapter" && (
            <Form {...formChapter}>
              <form
                className="mt-2"
                onSubmit={formChapter.handleSubmit(onSubmit)}
              >
                <div className="mb-3 space-y-2">
                  <p>Chapter Title</p>
                  <FormField
                    control={formChapter.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={formChapter.formState.isSubmitting}
                            placeholder="e.g 'Introduction to the course'"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3 space-y-2">
                  <p>Chapter description</p>
                  <FormField
                    control={formChapter.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            disabled={formChapter.formState.isSubmitting}
                            placeholder="e.g 'What will you learn from the course'"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-2">
                  <p>Chapter video</p>
                  <FormField
                    control={formChapter.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FileUpload
                          endpoint="courseAttachment"
                          onChange={(videoUrl) => {
                            if (videoUrl) {
                              setVideoUrl(videoUrl);
                              formChapter.setValue("videoUrl", videoUrl);
                            }
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={cn(
                  "flex items-center text-sm p-2 bg-slate-300 rounded-md shadow-sm",
                  !videoUrl && "italic"
                )}>
                  <p>
                    {videoUrl
                      ? videoUrl.slice(0, 50) + "..."
                      : "No video was uploaded..."}
                  </p>
                  {videoUrl && (
                    <Trash2
                      onClick={() => handleFileDelete(videoUrl)}
                      className="ml-auto w-4 h-4"
                    />
                  )}
                </div>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    type="submit"
                    disabled={formChapter.formState.isSubmitting}
                  >
                    Create Chapter
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* make folder sec */}
          {creationState === "folder" && (
            <Form {...formFolder}>
              <form
                className="mt-2"
                onSubmit={formFolder.handleSubmit(onSubmit)}
              >
                <FormField
                  control={formFolder.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={formFolder.formState.isSubmitting}
                          placeholder="e.g 'Course introduction section'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-2">
                  <Button
                    variant="outline"
                    type="submit"
                    disabled={formFolder.formState.isSubmitting}
                  >
                    Create Folder
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </>
      ) : (
        <div
          className={cn(
            "text-sm text-slate-500",
            initialData.chaptersFolders.length === 0 && "italic"
          )}
        >
          {initialData.chaptersFolders?.length > 0 ? (
            <div className="space-y-2 transition-all duration-300">
              {initialData.chaptersFolders.map((cf) => {
                return (
                  <div key={cf.id}>
                    <div className="bg-slate-200 p-1 rounded-md">
                      <button
                        onClick={() => setIsChapterShow(cf.id)}
                        className="w-full"
                      >
                        <div className="flex items-center">
                          {isChapterShow === cf.id ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                          {cf.title}
                        </div>
                      </button>
                    </div>
                    <div>
                      {isChapterShow === cf.id && (
                        <div className="flex items-center ml-4 pl-2 pt-2  border-l-2 border-slate-300">
                          <div className="space-y-2">
                            {initialData.chaptersFolders.chapters?.length >
                            0 ? (
                              initialData.chaptersFolders.chapters.map(
                                (chapter) => (
                                  <div key={chapter.id}>{chapter.title}</div>
                                )
                              )
                            ) : (
                              <div className="ml-1">
                                No chapters available yet in this folder...
                              </div>
                            )}
                            <button
                              onClick={() => {
                                formChapter.setValue("chapterFolderId", cf.id);
                                handleCreate("chapter");
                              }}
                              className="flex items-center space-x-1 hover:text-sky-500"
                            >
                              <Plus className="w-4 h-4" />
                              <p>Add chapter to {cf.title}</p>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No folder yet...</div>
          )}

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
              <p>{null}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterForm;
