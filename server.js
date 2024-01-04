import express from "express";
/* import bodyParser from "body-parser"; */
import cors from "cors";
import coursesRouter from "./routes/coursesRoute.js";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import "./db/mongoDB.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://phil-star1984.github.io/ai_news/",
    ],
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "2mb",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

/* Routes */

app.use("/api/courses", coursesRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(errorHandler);

/* Start Server */
app.listen(PORT, () => {
  console.log(`Your app is running on http://localhost:${PORT}`);
});
