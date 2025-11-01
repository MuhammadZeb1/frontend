import React from "react";
import logo from "../assets/web-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../features/AuthSlice";

function Header() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="w-full bg-[#b3d9ff] py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-5">
        {/* ✅ Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10" />
          <h2 className="text-2xl font-bold text-gray-800">MyEcommerce</h2>
        </div>

        {/* ✅ Navbar Buttons */}
        <div className="flex items-center gap-3">
          {/* ---- Not Logged In ---- */}
          {!token && (
            <>
              <NavLink
                to="/login"
                className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-green-500 text-white px-4 py-1 rounded-xl hover:bg-green-600"
              >
                Register
              </NavLink>
            </>
          )}

          {/* ---- Vendor ---- */}
          {token && role === "vendor" && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-xl hover:bg-red-600"
            >
              Logout
            </button>
          )}

          {/* ---- Customer ---- */}
          {token && role === "customer" && (
            <>
              <NavLink
                to="/deshboard"
                className="bg-gray-300 px-4 py-1 rounded-xl hover:bg-gray-400"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/cartPage"
                className="bg-gray-300 px-4 py-1 rounded-xl hover:bg-gray-400"
              >
                Cart
              </NavLink>
              <NavLink
                to="/purchases"
                className="bg-gray-300 px-4 py-1 rounded-xl hover:bg-gray-400"
              >
                My Orders
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded-xl hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

          {/* ---- Delivery ---- */}
          {token && role === "delivery" && (
            <>
              <NavLink
                to="/getDeliveryAssign"
                className="bg-gray-300 px-4 py-1 rounded-xl hover:bg-gray-400"
              >
                Assigned Deliveries
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded-xl hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
