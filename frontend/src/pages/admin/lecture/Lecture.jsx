import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, index, courseId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F1] px-4 py-2 my-2">
      <h1 className="font-bold bg-blue-500 text-white  px-8 py-2 rounded-md dark:text-gray-100">
        Lecture - {index + 1}: {lecture.lectureTitle}
      </h1>
      <Edit
        size={20}
        className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition hover:scale-105 duration-300"
        onClick={() => {
          navigate(`${lecture._id}`);
        }}
      />
    </div>
  );
};

export default Lecture;
