import express from "express";
import * as authController from "../controller/authController.js";

const authRouter = express.Router();

authRouter
  .post("/signup", authController.signUp)
  .post("/signin", authController.signIn);

export default authRouter;
