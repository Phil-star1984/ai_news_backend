import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    description: { type: String, required: false },
    duration: { type: String, required: false },
    author: { type: String, required: false },
    imgUrl: { type: String, required: false },
    image: { type: Object, required: false },
    learningUnits: [
      {
        title: { type: String, required: false },
        imgUrl: { type: String, required: false },
        image: { type: Object, required: false },
        content: [
          {
            section: { type: String, required: false },
            text: { type: String, required: false },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", coursesSchema);

export default Course;
