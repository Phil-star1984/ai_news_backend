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
      // send 404 if course not found
      return res.status(404).send({ message: "Course not found" });
    }

    /* console.log(result); */
    res.send(result);
  } catch (error) {
    console.error(error);
    //pass to middleware
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
  } catch (error) {
    console.error(error);
    next({ status: 500, message: "Internal server error", error: error });
  }
};
