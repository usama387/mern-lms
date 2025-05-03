import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/connectToDb.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";

// to access environment variables in .env file
dotenv.config();

// App Config
const app = express();

// invoke db connection
connectDb();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// user auth api route
app.use("/api/user", userRouter);

// course api route
app.use("/api/course", courseRouter);

// media api route
app.use("/api/media", mediaRoute);

// test api end point
app.get("/", (req, res) => {
  res.send("LMS backend is running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
