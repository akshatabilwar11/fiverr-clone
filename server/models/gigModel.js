// server/models/gigModel.js
import mongoose from "mongoose";

const GigSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const Gig = mongoose.models.Gig || mongoose.model("Gig", GigSchema);

export default Gig;
