"use client"

import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex flex-col gap-5">
        This is landing page
        <Button onClick={() => router.push("/courses")}>Get started</Button>
      </div>
    </div>
  );
}
