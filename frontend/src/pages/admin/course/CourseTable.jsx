import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetInstructorCoursesQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CourseTable = () => {
  // useNavigate hook to navigate to different routes
  const navigate = useNavigate();

  // accessing the data which has courses and loading state from the query in courseApi
  const { data, isLoading, refetch } = useGetInstructorCoursesQuery();

  // refetch the course data when the component mounts
  useEffect(() => {
    refetch();
  }, [data]);

  if (isLoading) {
    return (
      <div className="mt-20">
        <Skeleton className="h-10 w-[130px] mb-4" />
        <Table>
          <TableCaption>A list of your recent courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-[50px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[80px] rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-8 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <Link to="/admin/course/create">
        <Button className="transition hover:scale-105 duration-300">
          Add New Course
        </Button>
      </Link>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses?.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course?.price || "NA"}
              </TableCell>
              <TableCell>
                <Badge className="px-4 py-1 text-sm">
                  {course?.isPublished === true ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>{course?.title}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    navigate(`${course._id}`);
                  }}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
