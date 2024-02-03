import User from "../models/userSchema.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

export const getAllUsers = asyncHandler(async (req, res) => {
  const result = await User.find();
  if (!result) {
    throw new CustomError("No users in database", 404);
  }
  res.status(200).send(result);
});

export const getOneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError(`No user found with id: ${id}`, 404);
  }
  res.status(200).send(result);
});

export const createNewUser = asyncHandler(async (req, res) => {
  // get user data from body
  // check if user already exists
  // if yes, error, if no ...
  // new user with mongoosedb schema
  // save in mongoosedb
  // success or error message

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new CustomError("User already exists", 400);
  }

  // hashing the user's password before saving it to the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });
});
