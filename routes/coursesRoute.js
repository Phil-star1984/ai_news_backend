import express from "express";
import * as coursesController from "../controller/coursesController.js";

const coursesRouter = express.Router();

coursesRouter.route("/").get(coursesController.getAllCourses);

/* coursesRouter.route("/:id").get(coursesController.getOneCourse); */

/* Route for uploading content of courses */
coursesRouter.route("/upload").post(coursesController.uploadNewCourse);

export default coursesRouter;
