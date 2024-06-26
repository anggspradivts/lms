"use client";

import { CircleUser, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const testi = [1, 2, 3];
  const router = useRouter();

  const handleRoute = (url: string) => {
    router.push(url);
  };

  return (
    <div className="p-4 md:px-20">
      <div className="grid md:grid-cols-2 h-[700px]">
        <div className="flex flex-col justify-center items-center gap-y-7">
          <p className="text-6xl">Unlock Your Potential</p>
          <p>Discover a diverse array of courses crafted by industry experts</p>
          <div className="flex gap-x-3 text-lg">
            <button className="border border-black p-5">Discover More</button>
            <button
              onClick={() => handleRoute("/courses")}
              className="bg-sky-500 p-5 text-white"
            >
              Start Learning
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/learning-ilustration.png"
            height={600}
            width={600}
            alt="learning-ilustration"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 h-[400px] md:h-[700px]">
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/learning-rafiki.png"
            height={400}
            width={400}
            alt="learning-ilustration"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-y-7">
          <p className="text-4xl md:text-6xl">Enhance Your Skills</p>
          <button
            onClick={() => handleRoute("/courses")}
            className="bg-slate-500 p-5 text-white"
          >
            Start Learning
          </button>
        </div>
      </div>
      <div className="md:grid md:grid-cols-3 flex overflow-x-scroll md:overflow-x-hidden  min-w-[400px] gap-x-5">
        {testi.map((t, index) => {
          return (
            <div
              key={index}
              className="border border-slate-300 min-w-[300px] md:w-auto rounded-xl"
            >
              <div className="flex border-b border-slate-300 p-2 space-x-4">
                <CircleUser />
                <p>John Doe</p>
              </div>
              <p className="p-2">
                This platform has completely transformed my learning experience.
                The courses are well-structured, and the instructors are
                incredibly knowledgeable. I&apos;ve gained so many new skills
                that have already helped me in my career
              </p>
            </div>
          );
        })}
      </div>
      <div className="grid md:grid-cols-2 h-[400px] md:h-[700px]">
        <div className="flex flex-col justify-center items-center gap-y-4 text-start">
          <p className="text-4xl md:text-6xl">Share Your Skills</p>
          <p className="text-lg">be a mentor, and join our Community</p>
          <button
            onClick={() => handleRoute("/teach")}
            className="bg-slate-500 p-5 text-white"
          >
            Start Teach
          </button>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/teacher-student.png"
            height={400}
            width={400}
            alt="learning-ilustration"
          />
        </div>
      </div>
      <div className="md:grid md:grid-cols-3 flex overflow-x-scroll md:overflow-x-hidden min-w-[400px] gap-x-5">
        {testi.map((t, index) => {
          return (
            <div
              key={index}
              className="border border-slate-300 min-w-[300px] md:w-auto rounded-xl"
            >
              <div className="p-2 flex justify-center items-center h-[150px] bg-slate-300">
                <ImageIcon />
              </div>
              <p className="p-2">Course Title</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
