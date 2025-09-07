import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px" }}>
        <Outlet />   {/* 👈 THIS IS CRUCIAL */}
      </main>
    </>
  );
}
console.log("App rendering");
