import User from "../models/userSchema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js"

export const signUp = asyncHandler(async (req, res, next) => {
  // get data from body
  const { name, email, password } = req.body;

  // check if user exists in database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("User already exists", 409);
  }

  // create new User and save in database
  const user = {
    name,
    email,
    password,
  };

  const newUser = await User.create(user);
  res.status(200).send(newUser);

  /* console.log(error);
    res.status(500).send({ message: "Something went wrong" });
    next(error); */
});
