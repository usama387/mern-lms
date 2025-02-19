import express from "express";
import { createCourse } from "../controllers/course.controller.js";
import isUserAuthenticated from "../middlewares/isUserAuthenticated.js";

const courseRouter = express.Router();

courseRouter.post("/create", isUserAuthenticated, createCourse);

export default courseRouter;
