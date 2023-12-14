import express from "express";
import * as coursesController from "../controller/coursesController.js";

const coursesRouter = express.Router();

coursesRouter.route("/").get(coursesController.getAllCourses);

coursesRouter.route("/:id").get(coursesController.getOneCourse);

coursesRouter.route("/create").post(coursesController.createNewCourse);

export default coursesRouter;
