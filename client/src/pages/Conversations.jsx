import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Conversations = () => {
  const { currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch("/api/conversations", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });

        if (!res.ok) {
          const errMsg = await res.text();
          setError(errMsg);
          return;
        }

        const data = await res.json();
        setConversations(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (currentUser?.token) {
      fetchConversations();
    }
  }, [currentUser]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Conversations</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {conversations.length === 0 && !error && <p>No conversations yet.</p>}

      <ul>
        {conversations.map((c) => (
          <li key={c._id} style={{ marginBottom: "10px" }}>
            <Link to={`/messages/${c._id}`}>
              Conversation with{" "}
              {c.sellerId === currentUser?._id ? "Buyer" : "Seller"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversations;
