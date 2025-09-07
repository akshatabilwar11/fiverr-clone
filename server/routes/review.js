import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Create a new review (protected route)
router.post("/:gigId", verifyToken, createReview);

// Get reviews for a gig
router.get("/:gigId", getReviews);

export default router;
