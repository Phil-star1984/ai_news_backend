import express from "express";
import * as authController from "../controller/authController.js";
import verifyToken from "../middleware/verifyToken.js";

const authRouter = express.Router();

authRouter
  .post("/signup", authController.signUp)
  .post("/signin", authController.signIn)
  .get("/me", verifyToken, authController.getUser)
  .post("/logout", verifyToken, authController.logOut)

export default authRouter;
