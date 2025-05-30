import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";
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

// controller to get only published courses for students displayed on home page
export const getPublishedCourses = async (_, res) => {
  try {
    const publishedCourses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name profilePicUrl",
    });
    if (!publishedCourses) {
      return res.status(404).json({
        success: false,
        message: "No published courses found",
        courses: [],
      });
    }

    return res.status(200).json({
      courses: publishedCourses,
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

// controller to update a lecture
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;

    const { courseId, lectureId } = req.params;

    // find lecture
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    // update lecture
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

    if (videoInfo?.videoUrl) {
      lecture.videoUrl = videoInfo.videoUrl;
    }

    if (videoInfo?.publicId) {
      lecture.publicId = videoInfo.publicId;
    }

    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // now update this lecture in course table by ensuring the course has still lecture id if it was not already added
    const course = await Course.findById(courseId);

    // if course has no updated lecture id then add it
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      lecture,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// controller to delete a lecture
export const deleteLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    if (!lectureId) {
      return res
        .status(400)
        .json({ success: false, message: "Lecture ID is required" });
    }
    // find lecture
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    // delete lecture from cloudinary
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    // now remove this lecture from course table
    await Course.updateOne(
      { lectures: lectureId }, //find course that contains this lecture id
      { $pull: { lectures: lectureId } } // remove this lecture id from course lectures array
    );

    res.status(200).json({
      success: true,
      message: "Lecture removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// controller to get a lecture by its id
export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    if (!lectureId) {
      return res
        .status(400)
        .json({ success: false, message: "Lecture ID is required" });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lecture fetched successfully",
      lecture,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// controller to publish or unpublish a course by admin
export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required to perform this operation",
      });
    }

    // its either true or false
    const { publish } = req.query;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    //publish status based on query parameter
    course.isPublished = publish === "true";

    // save the course now
    await course.save();

    const publishedStatusMessage = course.isPublished
      ? "published"
      : "unpublished";

    res.status(200).json({
      success: true,
      message: `Course ${publishedStatusMessage} successfully`,
      course,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update publish status" });
  }
};
