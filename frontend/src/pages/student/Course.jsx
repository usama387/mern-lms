import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-700 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="/next.png"
          alt="course-icon"
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          Next.Js 15 Course 2025
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="cursor-pointer"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-base dark:text-emerald-500 text-gray-600">Usama Razaaq</h3>
          </div>
          <Badge className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full">Advanced</Badge>
        </div>
        <div className="text-lg font-bold text-end">
          <span>3500.00 PKR</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
