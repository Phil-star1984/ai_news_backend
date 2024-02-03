import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import jwt from "jsonwebtoken";

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new CustomError("Please login", 401);
  }

  /* console.log(token); */

  const decoded = jwt.verify(token, process.env.SECRETJWTKEY);

  req.uid = decoded.uid;
  next();
});

export default verifyToken;
