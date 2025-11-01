import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar";

// ✅ Import route arrays
import { publicRoutes, vendorRoutes, customerRoutes, deliveryRoutes } from "./routes/routes";

function App() {
  const { token } = useSelector((state) => state.auth);

  // ✅ Decode user role from JWT token
  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role?.toLowerCase();
      console.log("Decoded role:", role);
    } catch (error) {
      console.error("Invalid token");
    }
  }

  // ✅ Choose routes according to user role
  const getRoutes = () => {
    if (role === "vendor") return vendorRoutes;
    if (role === "customer") return customerRoutes;
    if (role === "delivery") return deliveryRoutes;
    return [];
  };

  return (
    <>
      {/* ✅ Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Navbar (visible on all pages) */}
      <Navbar />

      {/* ✅ Routes */}
      <Routes>
        {/* 🌍 Public Routes */}
        {publicRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}

        {/* 🔒 Role-Based Routes */}
        {getRoutes().map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}

        {/* ⚠️ Redirect if route not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
