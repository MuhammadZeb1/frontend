// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

// ✅ Define redirect paths for unauthorized access
const roleRedirects = {
  vendor: "/readProduct",
  customer: "/deshboard",
  delivery: "/getDeliveryAssign",
};

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation(); // ✅ Get current route path

  // 🔹 If not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("❌ Invalid token:", error);
    return <Navigate to="/login" replace />;
  }

  const userRole = decoded.role?.toLowerCase();
  const normalizedRoles = (allowedRoles || []).map((r) => r.toLowerCase());

  // 🔹 If unauthorized → redirect (avoid infinite loop)
  if (!normalizedRoles.includes(userRole)) {
    const redirectPath = roleRedirects[userRole] || "/";
    if (location.pathname !== redirectPath) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  // 🔹 Authorized → render content
  return children;
};

export default ProtectedRoute;
