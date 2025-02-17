import jwt from "jsonwebtoken";

const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({
        success: false,
        message: "No token found, hence not authorized",
      });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken)
      return res.status(401).json({ success: false, message: "Invalid token" });

    req.id = verifyToken.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isUserAuthenticated;
