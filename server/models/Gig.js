// server/models/Gig.js
import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const Gig = mongoose.models.Gig || mongoose.model("Gig", gigSchema);

export default Gig;
