import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";  // ✅ import AuthProvider

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>   {/* ✅ wrap everything here */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);
