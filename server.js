import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import coursesRouter from "./routes/coursesRoute.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

/* Separation of Concerns. I want a route for "/courses" and separate routes/controller/utils files. */

app.use("/courses", coursesRouter);

/* Start Server */
app.listen(PORT, () => {
  console.log(`Your app is running on http://localhost:${PORT}`);
});
