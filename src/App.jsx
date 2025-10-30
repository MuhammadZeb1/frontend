// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import VendorLayout from "./components/VendorLayout";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Correct import
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      {/* ✅ Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />

      <Routes>
        {/* ✅ Public routes */}
        {publicRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}

        {/* ✅ Vendor Protected Routes */}
        {privateRoutes
          .filter((route) => route.role === "vendor")
          .map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorLayout>{element}</VendorLayout>
                </ProtectedRoute>
              }
            />
          ))}

        {/* ✅ Customer Protected Routes */}
        {privateRoutes
          .filter((route) => route.role === "customer")
          .map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  {element}
                </ProtectedRoute>
              }
            />
          ))}

        {/* ✅ Delivery Protected Routes */}
        {privateRoutes
          .filter((route) => route.role === "delivery")
          .map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute allowedRoles={["delivery"]}>
                  {element}
                </ProtectedRoute>
              }
            />
          ))}

        {/* ✅ Fallback Route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
