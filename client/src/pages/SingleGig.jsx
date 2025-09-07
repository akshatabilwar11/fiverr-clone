import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleGig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/gigs/${id}`);
        const data = await res.json();
        setGig(data);
      } catch (err) {
        console.error("Error fetching gig:", err.message);
      }
    };

    fetchGig();
  }, [id]);

  const handleBuy = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gigId: id }),
      });

      if (!res.ok) throw new Error("Order creation failed");
      alert("✅ Order created successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err.message);
      alert("❌ Could not create order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {gig ? (
        <>
          <h2>{gig.title}</h2>
          <p>{gig.desc}</p>
          <p>Price: ${gig.price}</p>
          <button onClick={handleBuy}>Buy Now</button>
        </>
      ) : (
        <p>Loading gig...</p>
      )}
    </div>
  );
};

export default SingleGig;
