import express from "express";
import * as coursesController from "../controller/coursesController.js";

const coursesRouter = express.Router();

coursesRouter
.get("/all", coursesController.getAllCourses)
.get("/:id", coursesController.getOneCourse);

export default coursesRouter;
