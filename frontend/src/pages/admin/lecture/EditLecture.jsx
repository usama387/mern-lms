import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  // grabbing courseId from params to redirect user on course lecture page
  const params = useParams();

  const courseId = params?.courseId;

  return (
    <div>
      <div className="flex items-center justify-between mt-10 mx-10">
        <div className="flex items-center gap-2">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full ring-2 ring-blue-500"
            >
              <ArrowLeft size={20} className="mr-2" />
            </Button>
          </Link>
          <h1 className="font-semibold text-xl text-gray-500 dark:text-emerald-500">
            Edit Lecture
          </h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;
