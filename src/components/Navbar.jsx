import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../features/AuthSlice";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

  const linkClasses =
    "text-white transition-colors duration-300 hover:text-yellow-300 hover:underline underline-offset-4";

  // 🔥 Button hover animation using Framer Motion
  const MotionButton = motion(Button);

  const renderLinks = () => {
    if (!token) {
      return (
        <>
          <MotionButton
            asChild
            variant="link"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
          </MotionButton>

          <MotionButton
            asChild
            variant="link"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink to="/login" className={linkClasses}>
              Login
            </NavLink>
          </MotionButton>

          <MotionButton
            asChild
            variant="link"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink to="/register" className={linkClasses}>
              Register
            </NavLink>
          </MotionButton>
        </>
      );
    }

    if (role === "vendor") {
      return (
        <>
          <MotionButton asChild variant="link" whileHover={{ y: -3 }}>
            <NavLink to="/createProduct" className={linkClasses}>
              Create Product
            </NavLink>
          </MotionButton>

          <MotionButton asChild variant="link" whileHover={{ y: -3 }}>
            <NavLink to="/readProduct" className={linkClasses}>
              My Products
            </NavLink>
          </MotionButton>

          <MotionButton asChild variant="link" whileHover={{ y: -3 }}>
            <NavLink to="/GetVendorPurchases" className={linkClasses}>
              Purchases
            </NavLink>
          </MotionButton>

          <MotionButton asChild variant="link" whileHover={{ y: -3 }}>
            <NavLink to="/getAllDelivery" className={linkClasses}>
              Delivery
            </NavLink>
          </MotionButton>

          <MotionButton
            variant="destructive"
            onClick={handleLogout}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </MotionButton>
        </>
      );
    }

    if (role === "customer") {
      return (
        <>
          <MotionButton asChild variant="link" whileHover={{ y: -3 }}>
            <NavLink to="/deshboard" className={linkClasses}>
              Dashboard
            </NavLink>
          </MotionButton>
          <MotionButton asChild variant="link" whileHover={{ y: -3 }}>
            <NavLink to="/cartPage" className={linkClasses}>
              Cart
            </NavLink>
          </MotionButton>
          <MotionButton asChild variant="link" whileHover={{ y: -3 }}>
            <NavLink to="/purchases" className={linkClasses}>
              Purchases
            </NavLink>
          </MotionButton>
          <MotionButton
            variant="destructive"
            onClick={handleLogout}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </MotionButton>
        </>
      );
    }

    if (role === "delivery") {
      return (
        <>
          <MotionButton asChild variant="link" whileHover={{ y: -3 }}>
            <NavLink to="/getDeliveryAssign" className={linkClasses}>
              Assigned Deliveries
            </NavLink>
          </MotionButton>
          <MotionButton
            variant="destructive"
            onClick={handleLogout}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </MotionButton>
        </>
      );
    }
  };

  return (
    <motion.nav
      className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <motion.h1
        className="text-xl font-bold hover:text-yellow-200 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
      >
        🛒 Multi-Vendor App
      </motion.h1>

      <motion.div
        className="flex gap-3 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {renderLinks()}
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
