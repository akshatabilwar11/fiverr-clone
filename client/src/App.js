import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Gigs from "./pages/Gigs";
import Gig from "./pages/Gig";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Conversations from "./pages/Conversations";
import Messages from "./pages/Messages";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gigs" element={<Gigs />} />
        <Route path="gig/:id" element={<Gig />} />
        <Route path="orders" element={<Orders />} />
        <Route path="conversations" element={<Conversations />} />
        <Route path="messages/:id" element={<Messages />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
console.log("App rendering");
