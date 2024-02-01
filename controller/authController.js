import CustomError from "../utils/customError.js";
import User from "../models/userSchema.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res, next) => {
  // get data from body
  const { name, email, password } = req.body;

  // check if user exists in database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("User already exists", 409);
  }

  // what steps do I have to add for authentication?
  // hash password with bcrypt and save
  // create jwt token and save in cookies

  const hash = await bcrypt.hash(password, 10);

  // create new User and save in database
  const newUser = await User.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign({ uid: newUser._id }, process.env.SECRETJWTKEY);

  // send jwt in cookies
  res.cookie("token", token, {
    httpOnly: true,
    /* sameSite: "None",
    secure: true, */
    maxAge: 1800000,
  });

  // send back status & success message
  res.status(201).send({ status: "success" });
});

export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) {
    throw new CustomError("User does not exist", 409);
  }

  // compare password of user with existing user in database
  const comparedPwd = await bcrypt.compare(password, existingUser.password);
  if (!comparedPwd) {
    throw new CustomError("Authentication failed", 401);
  }

  //sign user a JWT token and send via cookies
  const token = jwt.sign(
    { uid: existingUser._id },
    process.env.SECRETJWTKEY
    /* { expiresIn: "1h" } */
  );
  if (!token) {
    throw new CustomError("Token is invalid", 401);
  }

  res.cookie("token", token, {
    httpOnly: false,
    sameSite: "lax",
    secure: true,
    maxAge: 1800000,
  });
  res.status(200).send({ message: "success" });
});

export const getUser = asyncHandler(async (req, res, next) => {
  /* console.log(req.uid); */

  const user = await User.findById(req.uid, { password: 0 });
  if (!user) {
    throw new CustomError(`User with id:${uid} does not exist`);
  }

  res.status(200).json(user);
});

export const logOut = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).send({ status: "success" });
});
