import React from "react";
import logo from "../assets/web-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

function Header() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Decode token to get role
  
  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      console.log("role ", role);
    } catch (error) {
      console.error("Invalid token");
    }
  }

  // 🔹 Logout
  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
    navigate("/login");
  };

  // 🔹 Role-based navigation links
  let roleLinks = [];

  if (role === "vendor") {
    roleLinks = [
      { path: "/readProduct", label: "My Products" },
      { path: "/createProduct", label: "Add Product" },
      { path: "/GetVendorPurchases", label: "Purchases" },
      { path: "/getAllDelivery", label: "Deliveries" },
    ];
  } else if (role === "customer") {
    roleLinks = [
      { path: "/deshboard", label: "Dashboard" },
      { path: "/cartPage", label: "Cart" },
      { path: "/purchases", label: "My Orders" },
    ];
  } else if (role === "delivery") {
    roleLinks = [
      { path: "/getDeliveryAssign", label: "Assigned Deliveries" },
    ];
  }

  // 🔹 Default public links (no token)
  const publicLinks = [
    { path: "/", label: "Home" },
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];

  return (
    <div className="container px-3 py-2">
      <div className="flex justify-between mt-1 bg-transparent items-center rounded-lg shadow-md">
        {/* Logo */}
        <img src={logo} alt="Website Logo" className="w-16 h-auto ml-5" />

        {/* Navigation Links */}
        <div className="flex gap-4 mr-5 items-center">
          {token
            ? roleLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `px-4 py-1 rounded-xl text-lg transition duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white font-bold shadow-md"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))
            : publicLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `px-4 py-1 rounded-xl text-lg transition duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white font-bold shadow-md"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

          {/* 🔹 Logout Button (only if logged in) */}
          {token && (
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-xl text-lg bg-red-500 text-white hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
