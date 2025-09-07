// server/controllers/userController.js
import User from "../models/userModel.js";


// 📌 Delete a user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get a single user
export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
