import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";

const CourseDetailPage = () => {
  // Dummy data for course content and video player
  const purchasedCourse = true;

  return (
    <div className="mt-20 space-y-5">
      {/* Course and Author Details blue bg div */}
      <div className="bg-blue-200 text-blue-900 dark:bg-blue-950 mx-2 rounded-md">
        <div className="flex flex-col gap-2 max-w-7xl mx-auto py-8 px-4 md:px-8">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg font-semibold">Course Sub-title</p>
          <p>
            Created By{" "}
            <span className="text-gray-700 font-semibold underline italic">
              Usama Razaaq
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={20} />
            <p>Last Update 5-May-2025</p>
          </div>
          <p>Students Enrolled: 15</p>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex flex-col md:flex-row justify-between gap-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Left Side */}
        <div className="w-full md:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            dolorem earum architecto asperiores debitis aliquid ullam quidem
            praesentium vero explicabo?
          </p>
          <Card className="w-full bg-gray-100 dark:bg-gray-800 ring-2 ring-blue-200">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription className="text-base font-semibold">
                4 lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((_, index) => (
                <div className="flex items-center gap-3 text-sm" key={index}>
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>Lecture Title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3">
          <Card className="bg-gray-100 dark:bg-gray-800 ring-2 ring-blue-200">
            <CardContent className=" flex flex-col p-4">
              <div className="w-full aspect-video mb-4">
                React Video Player Placeholder
              </div>
              <h4>Lecture Title</h4>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-end p-4">
              {purchasedCourse ? (
                <Button className="transition duration-300 hover:scale-105">Continue Watching</Button>
              ) : (
                <BuyCourseButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
