// src/components/VendorLayout.jsx
import React from "react";
import VendorSidebar from "./VendorSidebar";

function VendorLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar />
      <main className="flex-1 ">
        {children}
      </main>
    </div>
  );
}

export default VendorLayout;
