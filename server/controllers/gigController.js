import Gig from "../models/gigModel.js";

// ✅ Create Gig
export const createGig = async (req, res) => {
  try {
    const newGig = new Gig({
      userId: req.userId, // from verifyToken middleware
      ...req.body,
    });

    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Gig
export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ error: "Gig not found" });
    }

    if (gig.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "You can delete only your gigs!" });
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Gig deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Single Gig
export const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ error: "Gig not found" });
    }
    res.status(200).json(gig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Gigs
export const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find(); // You can later add filters
    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
