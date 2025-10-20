import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; // ✅ Import
import { LayoutDashboard, Package, ClipboardList, Truck, CheckSquare, User } from "lucide-react";

const VendorSidebar = () => {
  const { token } = useSelector((state) => state.auth);

  if (!token) return null;

  let decoded = null;
  try {
    decoded = jwtDecode(token);  // ✅ Decode token to get role
  } catch (error) {
    console.error("Invalid token");
    return null;
  }

  // ✅ Show sidebar only for vendor
  if (decoded.role !== "vendor") return null;

  const navItems = [
    { title: "Dashboard", to: "/vendor/dashboard", icon: <LayoutDashboard size={18} /> },
    { title: "Create Product", to: "/createProduct", icon: <Package size={18} /> },
    { title: "My Products", to: "/readProduct", icon: <ClipboardList size={18} /> },
    { title: "Purchases", to: "/GetVendorPurchases", icon: <ClipboardList size={18} /> },
    { title: "All Deliveries", to: "/getAllDelivery", icon: <Truck size={18} /> },
    { title: "Approve Delivery", to: "/GetDelivery", icon: <CheckSquare size={18} /> },
    { title: "Assigned Delivery", to: "/getVendorAssignDelivery", icon: <Truck size={18} /> },
    { title: "Profile", to: "/vendor/profile", icon: <User size={18} /> },
  ];

  return (
    <aside className="h-screen w-64 bg-blue-300 border-r shadow-sm sticky top-0">
      <div className="flex flex-col h-full">
        <div className="px-6 py-5 border-b">
          <h1 className="text-lg font-semibold">image</h1>
        </div>
        <nav className="flex-1 overflow-auto px-2 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                      isActive ? "bg-blue-600 text-white font-medium" : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <span>{item.icon}</span> {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-4 border-t">
          <NavLink to="/logout" className="text-red-600">Logout</NavLink>
        </div>
      </div>
    </aside>
  );
};

export default VendorSidebar;
