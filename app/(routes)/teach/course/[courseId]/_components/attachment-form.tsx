"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, Trash2, X } from "lucide-react";

import { FileUpload } from "@/components/file-upload";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";
import { useFormState } from "react-dom";
import { Form, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  url: z.string().min(1),
});

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  userId: string;
}
const AttachmentForm = ({ initialData, userId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [attachmentId, setAttachmentId] = useState("");
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/courses/${initialData.id}/attachments`,
        value
      );
      setIsEditing((prev) => !prev);
      toast.success("Success adding attachments")
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const onDelete2 = async (id: string) => {
    try {
      const response = await axios.delete(
        `/api/courses/${initialData.id}/attachments/${id}`
      );
      toast.success("Attachment success deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong...");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div
      className={cn(
        "bg-slate-100 rounded-md p-2 w-full",
        isEditing && "bg-slate-200"
      )}
    >
      <div className="flex justify-between items-center ">
        <div className="flex items-center space-x-3">
          <File className="h-4 w-4" />
          <h1 className="text-xl">Course attachment & resources</h1>
        </div>
        {!isEditing && (
          <Button variant="ghost" onClick={() => setIsEditing((prev) => !prev)}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        )}
        {isEditing && (
          <Button variant="ghost" onClick={() => setIsEditing((prev) => !prev)}>
            Cancel
          </Button>
        )}
      </div>
      <div>
        {!isEditing ? (
          <>
            {initialData.attachments.length === 0 && (
              <p className="text-sm mt-2 text-slate-500 italic">
                No attachments yet...
              </p>
            )}
            <div className="space-y-2 mt-2">
              {initialData.attachments.length > 0 &&
                initialData.attachments.map((attachment) => {
                  return (
                    <div
                      className="flex justify-between space-x-1 bg-slate-200 rounded-md p-1"
                      key={attachment.id}
                    >
                      <div className="flex items-center space-x-1">
                        <File className="w-4 h-4" />
                        <p className="text-sm text-slate-500">
                          {attachment.name}
                        </p>
                      </div>
                      {isDeleting === attachment.id ? (
                        <div>
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                      ) : (
                        <div className="flex">
                          <button onClick={() => {
                            onDelete2(attachment.id);
                            setIsDeleting(attachment.id)
                          }}>
                          <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <div>
            <FileUpload
              endpoint="courseAttachment"
              onChange={(url) => {
                if (url) {
                  onSubmit({ url: url });
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              Add anything your students might need to complete the course.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttachmentForm;
