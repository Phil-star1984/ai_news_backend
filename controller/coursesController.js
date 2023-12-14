import { courses } from "../data/coursesData.js";
import Course from "../models/coursesSchema.js";

export const getAllCourses = (req, res, next) => {
  res.send(courses);
  next();
};

export const getOneCourse = (req, res, next) => {
  const { id } = req.params;
  const result = courses[id];
  res.send(result);
  next();
};

export const createNewCourse = async(req, res, next) => {
  const { title, author, image, } = req.body;

  /* const result = new Course.find */

}
