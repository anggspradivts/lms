"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

import { FileUpload } from "@/components/file-upload";
import Image from "next/image";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Description is required",
  }),
});

interface UploadImageFormProps {
  initialData: Course;
  userId: string;
}
const UploadImageForm = ({ initialData, userId }: UploadImageFormProps) => {
  const [isEditing, setIsEditting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || "",
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
    <div
      className={cn("bg-slate-100 rounded-md p-2", isEditing && "bg-slate-200")}
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-xl">Course Image</h1>
        {!isEditing && !initialData.imageUrl && (
          <Button
            variant="ghost"
            onClick={() => setIsEditting((prev) => !prev)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        )}
        {!isEditing && initialData.imageUrl && (
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
          !initialData.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-300 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <Image
                className="object-cover"
                src={initialData.imageUrl}
                fill
                alt="upload"
              />
            </div>
          )
        ) : (
          <div>
            <FileUpload
              endpoint="courseImage"
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url });
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              16:9 aspect ratio reccomended
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImageForm;
