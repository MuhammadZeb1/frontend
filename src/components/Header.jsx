import React from 'react'
import logo from "../assets/web-logo.png"
import { NavLink, useNavigate } from 'react-router-dom'
import { navLinks, headerlinks } from '../routes/Links'
import { useSelector, useDispatch } from 'react-redux'

function Header() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    // 🔹 Clear token from Redux
    dispatch({ type: "auth/logout" })  
    // 🔹 Redirect to login page
    navigate("/login")
  }

  return (
    <div className="container px-3 py-2">
      <div className="flex justify-between mt-1 bg-gray-200 items-center rounded-lg shadow-md">
        
        {/* Logo */}
        <img 
          src={logo} 
          alt="Website Logo" 
          className="w-15 h-auto ml-5"
        />

        {/* Navigation Links */}
        {token ? (
          <div className="flex gap-4 mr-5 items-center focus:scale-40">
            {headerlinks.map(({ path, label }, index) => (
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

            {/* 🔹 Logout Button */}
            <button 
              onClick={handleLogout}
              className="px-4 py-1 rounded-xl text-lg bg-red-500 text-white hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4 mr-5">
            {navLinks.map(({ path, label }, index) => (
              <NavLink 
                key={index}
                to={path}
                className={({ isActive }) =>
                  `px-4 py-1 rounded-xl text-lg transition duration-300 focus:scale-150 ${
                    isActive 
                      ? "bg-blue-600 text-white font-bold shadow-md " 
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
  )
}

export default Header
