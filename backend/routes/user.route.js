import express from "express";
import {
  getUserProfileDetails,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import isUserAuthenticated from "../middlewares/isUserAuthenticated.js";

const userRouter = express.Router();

// Api routes for authentication, registration, user profile, etc.
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser)
userRouter.get("/getProfile", isUserAuthenticated, getUserProfileDetails);

export default userRouter;
