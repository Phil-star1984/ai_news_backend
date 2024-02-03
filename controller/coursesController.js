import Course from "../models/coursesSchemaNew.js";
import cloudinary from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
/* import { courses } from "../data/coursesData.js"; */

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  if (courses.length === 0) {
    throw new CustomError("No courses available", 404);
  }
  res.status(200).json(courses);
});

export const getOneCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await Course.find({ _id: id });
  if (!result) {
    // send 404 if course not found
    throw new CustomError("Course not found", 404);
  }
  /* console.log(result); */
  res.status(200).json(result);
});

export const uploadNewCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    duration,
    author,
    imgUrl,
    image,
    section_one,
    section_two,
    section_three,
    section_four,
    example_one,
    example_two,
    example_three,
    link_one,
    link_two,
    link_three,
  } = req.body;

  /* if (!title || !description || !section_one) {
      return res.status(400).json({ message: "Missing required fields" });
    } */

  let uploadImage = null;

  if (image) {
    uploadImage = await cloudinary.uploader.upload(image, {
      upload_preset: "ai_courses",
    });
  }

  const courseData = {
    title,
    description,
    duration,
    author,
    imgUrl,
    image: uploadImage ? uploadImage.url : "",
    section_one,
    section_two,
    section_three,
    section_four,
    example_one,
    example_two,
    example_three,
    link_one,
    link_two,
    link_three,
  };

  const course = new Course(courseData);
  const savedCourse = await course.save();
  res.status(201).json(savedCourse);
});
