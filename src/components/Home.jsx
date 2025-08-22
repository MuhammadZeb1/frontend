import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/web-logo.png";
import navLinks from '../routes/Links';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/AuthSlice";

function Home() {
  const  {token,user} = useSelector((state) => state.auth);
  console.log(token,user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());   // redux + localStorage clear
    navigate("/login");   // login page پر redirect
  };

  return (
    
    <div className="container px-3 py-2">
      <div className="flex justify-between mt-1 bg-gray-200 items-center rounded-lg shadow-md">
        
        {/* Logo */}
        <img
          src={logo}
          alt="Website Logo"
          className="w-15 h-auto ml-5"
        />

        {/* اگر login ہے تو Logout button دکھاؤ */}
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          // اگر login نہیں ہے تو navigation links دکھاؤ
          <div className="flex gap-4 mr-5">
            {navLinks.map(({ path, label }, index) => (
              <NavLink
                key={index}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
