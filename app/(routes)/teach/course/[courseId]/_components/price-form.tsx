"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, Pencil } from "lucide-react";

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
import { formPrice } from "@/lib/format";

const formSchema = z.object({
  price: z.coerce.number(),
});

interface PriceFormPageProps {
  initialData: Course;
  userId: string;
}
const PriceFormPage = ({ initialData, userId }: PriceFormPageProps) => {
  const [isEditing, setIsEditting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
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
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <h1 className="text-xl">Set a price</h1>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            onClick={() => setIsEditting((prev) => !prev)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit price
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
          <p className="text-sm text-slate-500 italic">
            {initialData.price ? formPrice(initialData.price) : "No price set..."}
          </p>
        ) : (
          <Form {...form}>
            <form className="mt-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        disabled={isSubmitting}
                        placeholder="set a price for your course..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto mt-2">
                <Button
                  variant="outline"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default PriceFormPage;
