import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateNewCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  // state variables to hold input values
  const [courseTitle, setCourseTitle] = useState("");

  const [courseCategory, setCourseCategory] = useState("");

  // to navigate user back to courses page
  const navigate = useNavigate("");

  // to grab selected category
  const getSelectedCategory = (value) => {
    setCourseCategory(value);
  };

  // destructuring from createNewCourse mutation from courseApi
  const [createNewCourse, { data, error, isSuccess, isLoading }] =
    useCreateNewCourseMutation();

  // function that triggers createNewCourse mutation in courseApi
  const CreateCourseHandler = async () => {
    await createNewCourse({ courseTitle, courseCategory });
  };

  // useEffect to handle success error states and then show toast messages and redirect user
  useEffect(() => {
    if (isSuccess) {
      setCourseTitle("");
      setCourseCategory("");
      toast.success(data?.message || "Course added successfully");
      navigate("/admin/course");
    }
  }, [data, error, isSuccess]);

  return (
    <div className="flex-1 mx-10 mt-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl text-gray-500 dark:text-emerald-500">
          Add a new course by providing essential information and relevant
          details.
        </h1>
        <p className="text-base mt-4">
          Include key details such as the course title, description, and
          prerequisites to create a comprehensive course profile.
        </p>
      </div>
      <div className="space-y-6">
        <div className="">
          <Label>Title</Label>
          <Input
            placeholder="Enter course title"
            type="text"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
          />
        </div>
        <div className="">
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="font-semibold text-base text-gray-600 dark:text-emerald-500">
                  Available Categories
                </SelectLabel>
                <SelectItem
                  value="Frontend Next.Js"
                  className="dark:text-emerald-500 font-medium text-base"
                >
                  Frontend Next.Js
                </SelectItem>
                <SelectItem
                  value="Data Science"
                  className="dark:text-emerald-500 font-medium text-base"
                >
                  Data Science
                </SelectItem>
                <SelectItem
                  value="Fullstack Development with MERN"
                  className="dark:text-emerald-500 font-medium text-base"
                >
                  Fullstack Development with MERN
                </SelectItem>
                <SelectItem
                  value="Backend with Node and Nest.Js"
                  className="dark:text-emerald-500 font-medium text-base"
                >
                  Backend with Node and Nest.Js
                </SelectItem>
                <SelectItem
                  value="Graphic Design"
                  className="dark:text-emerald-500 font-medium text-base"
                >
                  Graphic Design
                </SelectItem>
                <SelectItem
                  value="Ai and Machine Learning"
                  className="dark:text-emerald-500 font-medium text-base"
                >
                  Ai and Machine Learning
                </SelectItem>
                <SelectItem
                  value="Python"
                  className="dark:text-emerald-500 font-medium text-base"
                >
                  Python
                </SelectItem>
                <SelectItem
                  value="Docker"
                  className="dark:text-emerald-500 font-medium text-base"
                >
                  Docker
                </SelectItem>
                <SelectItem
                  value="JavaScript"
                  className="dark:text-emerald-500 font-medium text-base"
                >
                  JavaScript
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Link to={"/admin/course"}>
            <Button
              variant="outline"
              className="transition hover:scale-105 duration-300 text-gray-600"
            >
              Back to courses
            </Button>
          </Link>
          <Button
            className="transition hover:scale-105 duration-300"
            disabled={isLoading}
            onClick={CreateCourseHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
              </>
            ) : (
              "Add Now"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
