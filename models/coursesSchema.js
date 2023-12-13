import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  imgUrl: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
  learningUnits: [
    {
      title: String,
      imgUrl: String,
      content: [
        {
          section: String,
          text: String,
        },
      ],
    },
  ],
});

const Course = mongoose.model("Course", coursesSchema);

export default Course;
