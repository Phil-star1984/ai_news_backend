import express from "express";
import * as userController from "../controller/userController.js";

const userRouter = express.Router();

userRouter
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getOneUser)
  .post("/register", userController.createNewUser);

export default userRouter;
