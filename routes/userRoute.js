import express from "express";
import * as userController from "../controller/userController.js";

const userRouter = express.Router();

userRouter
  .get("/all", userController.getUser)
  .post("/register", userController.createNewUser);

export default userRouter;
