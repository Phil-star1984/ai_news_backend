import Course from "../models/coursesSchemaNew.js";
import cloudinary from "../utils/cloudinary.js";
/* import { courses } from "../data/coursesData.js"; */

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }

  next();
};

export const getOneCourse = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Course.find({ _id: id });
    if (!result) {
      throw { statusCode: 404, message: "course not found" };
    }
    /* console.log(result); */
    res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const uploadNewCourse = async (req, res, next) => {
  try {
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
      image: uploadImage,
      section_one,
      section_two,
      section_three,
      section_four,
    };

    const course = new Course(courseData);

    const savedCourse = await course.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
