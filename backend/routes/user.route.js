import express from "express";
import {
  getUserProfileDetails,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import isUserAuthenticated from "../middlewares/isUserAuthenticated.js";
import upload from "../utils/multer.js";

const userRouter = express.Router();

// Api routes for authentication, registration, user profile, etc.
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser)
userRouter.get("/getProfile", isUserAuthenticated, getUserProfileDetails);
userRouter.put("/profile/updateProfile", isUserAuthenticated, upload.single("profilePicture"), updateUserProfile);

export default userRouter;
