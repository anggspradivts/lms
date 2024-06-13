"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TeachPage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/teach/course");
  };
  return (
    <div>
      This is teach landing page
      <Button onClick={handleClick}>Go to teach course page</Button>
    </div>
  );
};

export default TeachPage;
