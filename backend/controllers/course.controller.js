import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { Lecture } from "../models/lecture.model.js";

// controller to create a course
export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required fields",
      });
    }

    const newCourse = await Course.create({
      title,
      category,
      creator: req.id,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      newCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// controller to get all courses created by the instructor
export const getAllInstructorCreatedCourses = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "No user id was provided" });
    }

    const courses = await Course.find({ creator: userId });

    if (!courses) {
      return res.status(404).json({
        success: false,
        message: "No courses found",
        course: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Instructor courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// controller to update a course
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Add validation for courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const { title, subtitle, description, category, level, price } = req.body;

    const thumbnail = req.file;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required fields",
      });
    }

    let course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    let courseThumbnail;

    // delete existing thumbnail before course update
    if (thumbnail) {
      if (course.thumbnail) {
        const publicId = course.thumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      // now upload new thumbnail on cloudinary and its url will be saved in the db
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    // data object to be passed in update query method
    const updatedCourseData = {
      title,
      subTitle: subtitle,
      description,
      category,
      level,
      price,
      thumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updatedCourseData, {
      new: true,
    });

    res.status(200).json({
      course,
      success: true,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// controller to get single course details using its id
export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({
      course,
      success: true,
      message: "Course fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// controller to create a new course lecture

export const createCourseLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Lecture title and course ID are required fields",
      });
    }

    const lecture = await Lecture.create({
      lectureTitle,
    });

    const course = await Course.findById(courseId);

    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// controller to get a course lecture
export const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "Course ID is required" });
    }

    // find the course
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
