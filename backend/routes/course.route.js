import express from "express";
import {
  createCourse,
  getAllInstructorCreatedCourses,
  getCourseById,
  updateCourse,
} from "../controllers/course.controller.js";
import isUserAuthenticated from "../middlewares/isUserAuthenticated.js";
import upload from "../utils/multer.js";

const courseRouter = express.Router();

courseRouter.post("/create", isUserAuthenticated, createCourse);
courseRouter.get(
  "/getCourses",
  isUserAuthenticated,
  getAllInstructorCreatedCourses
);
courseRouter.get("/:courseId", isUserAuthenticated, getCourseById);
courseRouter.put(
  "/:courseId",
  isUserAuthenticated,
  upload.single("thumbnail"),
  updateCourse
);

export default courseRouter;
