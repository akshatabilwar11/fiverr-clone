import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // ✅ Block buyers from accessing seller-only pages like /create
  const restrictedPaths = ["/create"];
  const currentPath = window.location.pathname;

  if (restrictedPaths.includes(currentPath) && !currentUser.user.isSeller) {
    return <div style={{ padding: "1rem", color: "red" }}>⛔ Only sellers can access this page.</div>;
  }

  return children;
};

export default ProtectedRoute;
