"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}
export default async function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {}, []);

  return (
    <div className="">
      <div className="flex justify-center">
        <div
          className="carousel h-[200px] md:h-[500px] w-5/6 flex justify-center items-end relative"
          style={{
            backgroundImage: `url('/aes-work.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white text-center font-bold md:text-2xl">
            <p className="pb-40">Start your learning journey</p>
            <button
              className=" hover:bg-black hover:bg-opacity-20 p-3 mb-20 transition-all duration-300"
              onClick={() => router.push("/courses")}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
      <div className="logo-sec">
        <div className="logo-slider overflow-hidden m-auto">
          <ul className="list-none"></ul>
        </div>
      </div>
      <div className="flex justify-center py-36">
        <div className="grid md:grid-cols-2 md:w-5/6">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center p-10 rounded-2xl w-[500px] h-[300px]">
              <Image
                src="/work.png"
                className=""
                height={300}
                width={300}
                alt="book"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="p-10 text-xl">
              Discover a diverse array of courses crafted by industry experts,
              designed to cater to all levels of expertise. From foundational
              courses to advanced masterclasses!
            </p>
          </div>
        </div>
      </div>
      <div className="py-20 flex justify-center rec-category">
        <div className="grid grid-cols-2 md:grid-cols-3 w-5/6 gap-10 text-center text-xl md:text-4xl">
          {categories.map((cate) => {
            return (
              <Link key={cate.id} href={`/${cate.name}`}>
                <div className="h-[200px] flex items-center justify-center bg-slate-100 rounded-lg transition-all duration-300 hover:scale-95  ">
                  <p>{cate.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
