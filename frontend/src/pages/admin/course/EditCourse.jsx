import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="mt-20">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-gray-600 dark:text-emerald-500 text-xl font-bold">
          Course Detailed Information
        </h1>
        <Link to="lecture">
          <Button variant="outline" className="font-semibold transition hover:scale-105 duration-300 hover:text-blue-500 ring-2 ring-blue-500">Open Lectures</Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
