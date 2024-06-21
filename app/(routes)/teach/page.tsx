"use client";
import { useRouter } from "next/navigation";

const TeachPage = () => {
  const router = useRouter();
  const handleRoute = (url: string) => {
    router.push(url);
  };
  return (
    <div className="md:px-20">
      <div className="grid md:grid-cols-2 h-[500px]">
        <div className="flex flex-col justify-center items-start gap-y-7">
          <p className="text-6xl">Join Our Community</p>
          <p>helps students unlock their full potential</p>
          <div className="flex gap-x-3 text-lg">
            <button className="border border-black p-5">Discover More</button>
            <button
              onClick={() => handleRoute("/teach/course")}
              className="bg-slate-500 p-5 text-white"
            >
              Start Teach
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          Image section
        </div>
      </div>
    </div>
  );
};

export default TeachPage;
