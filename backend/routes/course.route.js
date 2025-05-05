import express from "express";
import {
  createCourse,
  createCourseLecture,
  deleteLecture,
  editLecture,
  getAllInstructorCreatedCourses,
  getCourseById,
  getCourseLectures,
  getLectureById,
  getPublishedCourses,
  togglePublishCourse,
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
courseRouter.get(
  "/published-courses",
  isUserAuthenticated,
  getPublishedCourses
);
courseRouter.get("/:courseId", isUserAuthenticated, getCourseById);
courseRouter.put(
  "/:courseId",
  isUserAuthenticated,
  upload.single("thumbnail"),
  updateCourse
);
courseRouter.post(
  "/:courseId/createLecture",
  isUserAuthenticated,
  createCourseLecture
);
courseRouter.get(
  "/:courseId/getLectures",
  isUserAuthenticated,
  getCourseLectures
);
courseRouter.post(
  "/:courseId/lecture/:lectureId",
  isUserAuthenticated,
  editLecture
);
courseRouter.delete("/lecture/:lectureId", isUserAuthenticated, deleteLecture);
courseRouter.get("/lecture/:lectureId", isUserAuthenticated, getLectureById);
courseRouter.patch("/:courseId", isUserAuthenticated, togglePublishCourse);

export default courseRouter;
