import express from "express";
/* import bodyParser from "body-parser"; */
import cors from "cors";
import coursesRouter from "./routes/coursesRoute.js";
import userRouter from "./routes/userRoute.js";
import "./db/mongoDB.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(
  express.json({
    limit: "2mb",
  })
);
app.use(express.urlencoded({ extended: false }));

/* Separation of Concerns. I want a route for "/courses" and separate routes/controller/utils files. */

app.use("/api/courses", coursesRouter);
app.use("/user", userRouter);

/* Start Server */
app.listen(PORT, () => {
  console.log(`Your app is running on http://localhost:${PORT}`);
});
