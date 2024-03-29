import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "Basic", required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "aibro_users");
export default User;
