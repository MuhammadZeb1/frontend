import React, { useState } from "react";
import VendorSidebar from "./VendorSidebar";
import { Menu, X } from "lucide-react"; // ✅ Import X icon

function VendorLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 transition-transform duration-300 bg-white h-full shadow-lg md:shadow-none
        ${openSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        
        <VendorSidebar />
      </div>

      {/* Page Content */}
      <main className="flex-1 w-full">
        {/* Hamburger button - only show when sidebar is closed */}
        {!openSidebar && (
          <button
            onClick={() => setOpenSidebar(true)}
            className="md:hidden p-3 bg-blue-600 text-white m-2 rounded-md"
          >
            <Menu size={30} />
          </button>
        )}
        
        {/* Close button - only show when sidebar is open */}
        {openSidebar && (
          <button
            onClick={() => setOpenSidebar(false)}
            className="md:hidden p-3 bg-red-600 text-white ml-[90%] m-2 rounded-md"
          >
            <X size={30} />
          </button>
        )}
        {children}
      </main>
    </div>
  );
}

export default VendorLayout;
