import express from "express";
import {
  createCourse,
  getAllInstructorCreatedCourses,
} from "../controllers/course.controller.js";
import isUserAuthenticated from "../middlewares/isUserAuthenticated.js";

const courseRouter = express.Router();

courseRouter.post("/create", isUserAuthenticated, createCourse);
courseRouter.get(
  "/getCourses",
  isUserAuthenticated,
  getAllInstructorCreatedCourses
);

export default courseRouter;
