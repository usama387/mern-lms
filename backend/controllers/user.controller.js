import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import validator from "validator";

// Register a new user to the database
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "Incomplete data" });
    }

    // now check if the user is already registered
    const doesEmailExistInDb = await User.findOne({ email });

    if (doesEmailExistInDb) {
      res.status(400).json({ success: false, message: "Email already exists" });
    }

    // validate email and strong password format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user and save to the database
    await User.create({ name, email, password: hashedPassword });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// login user controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Incomplete data" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect password or email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password or email" });
    }

    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get user profile controller
export const getUserProfileDetails = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "No user id was provided" });
    }

    // find the user by their id from the request body
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// user logout controller
export const logoutUser = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "User logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
