import { Course } from "../models/course.model.js";

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
