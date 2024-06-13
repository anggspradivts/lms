"use client";

import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface Course {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  
}
const CoursesPage = () => {
  const [data, setData] = useState< Course[] >([]);

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
    <div>
      {data && data.length > 0 ? (
        data.map((course) => <div key={course.id}>{course.title}</div>)
      ) : (
        <div>
          <LoaderCircle className="animate-spin"/>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
