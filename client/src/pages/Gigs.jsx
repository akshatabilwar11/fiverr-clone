// client/src/pages/Gigs.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Gigs = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch("/api/gigs");
        const data = await res.json();
        setGigs(data);
      } catch (err) {
        console.error("Failed to fetch gigs:", err);
      }
    };

    fetchGigs();
  }, []);

  return (
    <div>
      <h2>All Gigs</h2>
      {gigs.length === 0 ? (
        <p>No gigs available.</p>
      ) : (
        gigs.map((gig) => (
          <div key={gig._id}>
            <h3>{gig.title}</h3>
            <p>Price: ₹{gig.price}</p>
            <Link to={`/gig/${gig._id}`}>View Gig</Link>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Gigs;
