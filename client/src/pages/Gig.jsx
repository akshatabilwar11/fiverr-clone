// client/src/pages/Gig.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Gig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [gig, setGig] = useState(null);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(`/api/gigs/${id}`);
        const data = await res.json();
        setGig(data);
      } catch (err) {
        console.error("Failed to fetch gig:", err);
      }
    };

    fetchGig();
  }, [id]);

  const handleBuyNow = async () => {
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`, // ✅ send JWT
      },
      body: JSON.stringify({
        gigId: gig._id,
        sellerId: gig.userId,   // ✅ seller of the gig
        price: gig.price,       // ✅ gig price
      }),
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    alert("Order placed successfully!");
  } catch (err) {
    alert(`Order failed: ${err.message}`);
  }
};


  if (!gig) return <p>Loading...</p>;

  return (
    <div>
      <h1>{gig.title}</h1>
      <p>Price: ₹{gig.price}</p>
      <p>Delivery Time: {gig.deliveryTime} days</p>

      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default Gig;
