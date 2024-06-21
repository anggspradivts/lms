
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LandingPage from "./_components/LandingPage";

export default async function Home() {

  return (
    <div>
      <LandingPage />
    </div>
  );
}
