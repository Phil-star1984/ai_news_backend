import { courses } from "../data/coursesData.js";

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
