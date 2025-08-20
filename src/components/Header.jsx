import React from 'react'
import logo from "../assets/web-logo.png"
import { NavLink } from 'react-router-dom'
import navLinks from '../routes/Links'

function Header() {
  return (
    <div className="container px-3 py-2">
      <div className="flex justify-between mt-1 bg-gray-200  items-center rounded-lg shadow-md">
        {/* Logo */}
        <img 
          src={logo} 
          alt="Website Logo" 
          className="w-15 h-auto ml-5"
        />

        {/* Navigation Links */}
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
      </div>
    </div>
  )
}

export default Header
