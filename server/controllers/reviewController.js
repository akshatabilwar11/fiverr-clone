import Review from "../models/reviewModel.js"; // Make sure this path and model name are correct

// ✅ Create Review
export const createReview = async (req, res) => {
  try {
    const { gigId, userId, star, desc } = req.body;

    const newReview = new Review({
      gigId,
      userId,
      star,
      desc,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Reviews for a Gig
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete a Review by ID
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
