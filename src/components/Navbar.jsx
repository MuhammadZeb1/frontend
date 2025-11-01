import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../features/AuthSlice"; // change path if your slice name differs

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role?.toLowerCase();
    } catch (error) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // 🌍 Navbar content changes according to role
  const renderLinks = () => {
    if (!token) {
      // Public user
      return (
        <>
          <NavLink to="/" className="hover:text-yellow-400">Home</NavLink>
          <NavLink to="/login" className="hover:text-yellow-400">Login</NavLink>
          <NavLink to="/register" className="hover:text-yellow-400">Register</NavLink>
        </>
      );
    }

    if (role === "vendor") {
      return (
        <>
          <NavLink to="/createProduct" className="hover:text-yellow-400">Create Product</NavLink>
          <NavLink to="/readProduct" className="hover:text-yellow-400">My Products</NavLink>
          <NavLink to="/GetVendorPurchases" className="hover:text-yellow-400">Purchases</NavLink>
          <NavLink to="/getAllDelivery" className="hover:text-yellow-400">Delivery</NavLink>
          <button onClick={handleLogout} className="text-red-400 ml-3">Logout</button>
        </>
      );
    }

    if (role === "customer") {
      return (
        <>
          <NavLink to="/deshboard" className="hover:text-yellow-400">Dashboard</NavLink>
          <NavLink to="/cartPage" className="hover:text-yellow-400">Cart</NavLink>
          <NavLink to="/purchases" className="hover:text-yellow-400">Purchases</NavLink>
          <button onClick={handleLogout} className="text-red-400 ml-3">Logout</button>
        </>
      );
    }

    if (role === "delivery") {
      return (
        <>
          <NavLink to="/getDeliveryAssign" className="hover:text-yellow-400">Assigned Deliveries</NavLink>
          <button onClick={handleLogout} className="text-red-400 ml-3">Logout</button>
        </>
      );
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🛒 Multi-Vendor App</h1>
      <div className="flex gap-4 items-center">{renderLinks()}</div>
    </nav>
  );
}

export default Navbar;
