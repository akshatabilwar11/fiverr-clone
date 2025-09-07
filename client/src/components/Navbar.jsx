import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const linkStyle = ({ isActive }) => ({
  marginRight: 12,
  textDecoration: isActive ? "underline" : "none",
});

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <NavLink to="/" style={linkStyle} end>Home</NavLink>
      <NavLink to="/gigs" style={linkStyle}>All Gigs</NavLink>

      {currentUser ? (
        <>
          <span style={{ marginRight: 12 }}>Welcome, {currentUser.user.username}</span>
          <NavLink to="/orders" style={linkStyle}>Orders</NavLink>
          <NavLink to="/conversations" style={linkStyle}>Messages</NavLink>
          {currentUser.user.isSeller && (
            <NavLink to="/create-gig" style={linkStyle}>Create Gig</NavLink>
          )}
          <button onClick={logout} style={{ marginLeft: 12 }}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login" style={linkStyle}>Login</NavLink>
          <NavLink to="/register" style={linkStyle}>Register</NavLink>
        </>
      )}
    </nav>
  );
}
