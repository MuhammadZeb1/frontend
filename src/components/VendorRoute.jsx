// src/components/VendorRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const VendorRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;

  // Decode token to get role
  const decoded = jwtDecode(token);
  // console.log(decoded); // check role inside token

  if (decoded.role !== "vendor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
