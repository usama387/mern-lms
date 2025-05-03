import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateCourseLectureMutation,
  useGetCourseLecturesQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  // getting course id to navigate
  const params = useParams();
  const courseId = params.courseId;

  // state variable to hold lecture title
  const [lectureTitle, setLectureTitle] = useState("");

  // mutation function from courseApi to create lecture
  const [createCourseLecture, { data, isLoading, error, isSuccess }] =
    useCreateCourseLectureMutation();

  // function to trigger above mutation
  const CreateLectureHandler = async () => {
    await createCourseLecture({ lectureTitle, courseId });
  };

  // useEffect to handle toast messages
  useEffect(() => {
    if (error) {
      toast.error(error.data.message || "Failed to create lecture");
    }
    if (isSuccess) {
      // refetch the lectures
      refetch();
      setLectureTitle("");
      toast.success(data.message || "Lecture created successfully");
    }
  }, [error, isSuccess]);

  // mutation function from courseApi to get course lectures by sending courseId in parameter
  const {
    data: lecturesData,
    isLoading: lecturesLoading,
    isError: lecturesError,
    refetch,
  } = useGetCourseLecturesQuery(courseId);

  return (
    <div className="flex-1 mx-10 mt-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl text-gray-500 dark:text-emerald-500">
          Add a new lecture by providing essential information and relevant
          details.
        </h1>
        <p className="text-base mt-4">
          Include key details such as the lecture title, description, and
          prerequisites to create a comprehensive course profile.
        </p>
      </div>
      <div className="space-y-6">
        <div className="">
          <Label>Title</Label>
          <Input
            placeholder="Lecture Title"
            type="text"
            onChange={(e) => setLectureTitle(e.target.value)}
            value={lectureTitle}
          />
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/admin/course/${courseId}`}>
            <Button
              variant="outline"
              className="transition hover:scale-105 duration-300 text-gray-600"
            >
              Back to course
            </Button>
          </Link>
          <Button
            className="transition hover:scale-105 duration-300"
            disabled={isLoading}
            onClick={CreateLectureHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
              </>
            ) : (
              "Create Now"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lecturesLoading ? (
            <p>Loading Lectures... </p>
          ) : lecturesError ? (
            <p>Failed to fetch lectures</p>
          ) : lecturesData.lectures.length === 0 ? (
            <p>No lectures found</p>
          ) : (
            lecturesData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                index={index}
                courseId={courseId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
