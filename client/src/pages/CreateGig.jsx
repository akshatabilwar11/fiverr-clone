import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/gigs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include token for protected route
        },
        body: JSON.stringify({ title, desc, price }),
      });

      if (!res.ok) throw new Error("Gig creation failed");

      await res.json(); // no need to store it

      alert("✅ Gig created successfully!");
      navigate("/"); // Optionally redirect
    } catch (err) {
      console.error("❌ Create gig error:", err.message);
      alert("Failed to create gig");
    }
  };

  return (
    <div>
      <h2>Create a New Gig</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Gig Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Create Gig</button>
      </form>
    </div>
  );
};

export default CreateGig;
