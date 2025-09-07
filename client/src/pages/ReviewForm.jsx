import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ReviewForm = ({ gigId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [star, setStar] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gigId,
          userId: currentUser.user._id,
          desc,
          star,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to submit review");

      alert("✅ Review submitted successfully!");
      setDesc("");
      setStar(5);
    } catch (err) {
      console.error("Review error:", err.message);
      alert("Review failed: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <textarea
        placeholder="Write your review..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <input
        type="number"
        min="1"
        max="5"
        value={star}
        onChange={(e) => setStar(e.target.value)}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
