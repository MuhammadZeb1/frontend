// src/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import ProtectedRoute from "./components/ProtectedRoute";
import VendorLayout from "./components/VendorLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔹 Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* 🔹 Vendor Routes with Sidebar */}
      {privateRoutes
        .filter((r) => r.role === "vendor")
        .map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorLayout>{element}</VendorLayout>
              </ProtectedRoute>
            }
          />
        ))}

      {/* 🔹 Customer Routes */}
      {privateRoutes
        .filter((r) => r.role === "customer")
        .map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                {element}
              </ProtectedRoute>
            }
          />
        ))}

      {/* 🔹 Delivery Routes */}
      {privateRoutes
        .filter((r) => r.role === "delivery")
        .map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRoles={["delivery"]}>
                {element}
              </ProtectedRoute>
            }
          />
        ))}
    </Routes>
  );
};

export default AppRoutes;
