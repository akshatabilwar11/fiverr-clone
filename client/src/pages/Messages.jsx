import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Messages = () => {
  const { id } = useParams(); // conversationId from URL
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  // ✅ Fetch messages when page loads
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${id}`, {
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
        setMessages(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (currentUser?.token) {
      fetchMessages();
    }
  }, [id, currentUser]);

  // ✅ Send a new message
  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify({
          conversationId: id,
          desc: text, // backend expects `desc`
        }),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        setError(errMsg);
        return;
      }

      const newMsg = await res.json();
      setMessages((prev) => [...prev, newMsg]); // update chat instantly
      setText(""); // clear input
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Messages</h2>

      {/* ✅ Show error if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Messages Box */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "200px",
          marginBottom: "10px",
          background: "#fafafa",
        }}
      >
        {messages.length === 0 && <p>No messages yet.</p>}

        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              textAlign: msg.userId === currentUser?._id ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <b>{msg.userId === currentUser?._id ? "You" : "Other"}:</b>{" "}
            {msg.desc || "(no text)"}
            <br />
            <small>
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleString()
                : "Invalid date"}
            </small>
          </div>
        ))}
      </div>

      {/* ✅ Input Box */}
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "80%",
            padding: "8px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button onClick={handleSend} style={{ padding: "8px 16px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
