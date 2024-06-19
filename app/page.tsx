"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LandingPage from "./_components/LandingPage";

interface Category {
  id: string;
  name: string;
}
export default async function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {}, []);

  return (
    <div>
      <LandingPage />
    </div>
  );
}
