import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
