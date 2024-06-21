"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { ImageIcon, LoaderCircle } from "lucide-react";
import { Category } from "@prisma/client";

interface Course {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string;
  isPublished: boolean;
}

interface CoursesPageProps {
  category: Category[];
}
const CoursesPage = ({ category }: CoursesPageProps) => {
  const [data, setData] = useState<Course[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/courses`);
      const { data } = response;
      setData(data);
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 md:my-20">
      <div className="text-center my-5">
        <p className="text-4xl font-bold">Choose Your Preferred Category</p>
      </div>
      <div className="category-sec grid grid-cols-2 md:grid-cols-3 gap-3 md:mx-20 text-[0.7rem] md:text-[1rem]">
        {category.map((cat) => (
          <Link key={cat.id} href={`/courses/category/${cat.id}`}>
            <div className="flex justify-center items-center p-10 bg-slate-700 text-white hover:scale-95 transition-all duration-300">
              <p className="font-bold text-center">{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
