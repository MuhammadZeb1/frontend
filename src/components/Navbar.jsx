import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { logout } from "../features/AuthSlice";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Hamburger icons

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

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
    setIsOpen(false);
  };

  const linkClasses =
    "text-white transition-colors duration-300 hover:text-yellow-300 hover:underline underline-offset-4";

  const MotionButton = motion(Button);

  const renderLinks = () => {
    const links = [];

    // 🔹 Guest Links
    if (!token) {
      links.push(
        <MotionButton key="home" asChild variant="link" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavLink to="/" className={linkClasses}>Home</NavLink>
        </MotionButton>,
        <MotionButton key="login" asChild variant="link" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavLink to="/login" className={linkClasses}>Login</NavLink>
        </MotionButton>,
        <MotionButton key="register" asChild variant="link" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavLink to="/register" className={linkClasses}>Register</NavLink>
        </MotionButton>
      );
    }

    // 🔹 Vendor Links
    if (role === "vendor") {
      links.push(
        <MotionButton key="home" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/" className={linkClasses}>Home</NavLink></MotionButton>,
        <MotionButton key="create" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/createProduct" className={linkClasses}>Create Product</NavLink></MotionButton>,
        <MotionButton key="myProducts" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/readProduct" className={linkClasses}>My Products</NavLink></MotionButton>,
        <MotionButton key="purchases" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/GetVendorPurchases" className={linkClasses}>Purchases</NavLink></MotionButton>,
        <MotionButton key="delivery" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/getAllDelivery" className={linkClasses}>Delivery</NavLink></MotionButton>,
        <MotionButton key="assignedDelivery" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/getVendorAssignDelivery" className={linkClasses}>Assigned Delivery</NavLink></MotionButton>,
        <MotionButton key="logout" variant="destructive" onClick={handleLogout} whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.95 }}>Logout</MotionButton>
      );
    }

    // 🔹 Customer Links
    if (role === "customer") {
      links.push(
        <MotionButton key="home" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/" className={linkClasses}>Home</NavLink></MotionButton>,
        <MotionButton key="dashboard" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/deshboard" className={linkClasses}>Dashboard</NavLink></MotionButton>,
        <MotionButton key="cart" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/cartPage" className={linkClasses}>Cart</NavLink></MotionButton>,
        <MotionButton key="purchases" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/purchases" className={linkClasses}>Purchases</NavLink></MotionButton>,
        <MotionButton key="logout" variant="destructive" onClick={handleLogout} whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.95 }}>Logout</MotionButton>
      );
    }

    // 🔹 Delivery Links
    if (role === "delivery") {
      links.push(
        <MotionButton key="home" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/" className={linkClasses}>Home</NavLink></MotionButton>,
        <MotionButton key="assigned" asChild variant="link" whileHover={{ y: -3 }}><NavLink to="/getDeliveryAssign" className={linkClasses}>Assigned Deliveries</NavLink></MotionButton>,
        <MotionButton key="logout" variant="destructive" onClick={handleLogout} whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.95 }}>Logout</MotionButton>
      );
    }

    return links;
  };

  return (
    <motion.nav
      className="bg-blue-500 text-white px-6 py-4 sticky top-0 z-50 shadow-md"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <div className="flex justify-between items-center">
        <motion.h1 className="text-xl font-bold hover:text-yellow-200 transition-colors duration-300" whileHover={{ scale: 1.05 }}>
          🛒 Multi-Vendor App
        </motion.h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-3 items-center">{renderLinks()}</div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden flex flex-col gap-3 mt-3"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          {renderLinks().map((link, idx) => (
            <div key={idx} onClick={() => setIsOpen(false)}>
              {link}
            </div>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
