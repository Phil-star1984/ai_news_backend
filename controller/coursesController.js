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
  } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "ai_courses",
      });

      if (uploadRes) {
        const course = new Course({
          title,
          description,
          duration,
          author,
          imgUrl,
          image: uploadRes,
          section_one,
          section_two,
          section_three,
        });

        const savedCourse = await course.save();

        res.status(200).send(savedCourse);
      }
    } else {
      const course = new Course({
        title,
        description,
        duration,
        author,
        imgUrl,
        section_one,
        section_two,
        section_three,
      });

      const savedCourse = await course.save();

      res.status(200).send(savedCourse);

      /* res.status(400).send({ message: "no image to upload" }); */
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
