import React from 'react'
import { FaWhatsapp, FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { motion } from "framer-motion";
import logo from "../assets/web-logo.png";
function Footer() {
  return (
    <>
           {/* Footer */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center  ">
              <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
              <h1 className="text-lg text-blue-900">MyEcommerce</h1>
            </div>
            <p className="text-blue-900">Follow us</p>
            <div className="flex gap-4 mt-2 text-xl">
              <a href="https://wa.me/923001234567" target="_blank" className="text-green-500">
                <FaWhatsapp />
              </a>
              <a href="https://linkedin.com/in/muhammad-zeb-3a8a032b1" target="_blank" className="text-blue-900">
                <CiLinkedin />
              </a>
              <a href="https://github.com/MuhammadZeb1" target="_blank" className="text-white">
                <FaGithub />
              </a>
            </div>
          </div>
          <div className="text-center">
            <h2 className="font-semibold mb-2 text-blue-900">Contact</h2>
            <ul className="space-y-1 text-gray-900">
              <li>GitHub</li>
              <li>0332-9610945</li>
              <li>WhatsApp</li>
            </ul>
          </div>
          <div className="text-right">
            <h2 className="font-semibold mb-2 text-blue-900">© 2025</h2>
            <ul className="space-y-1 text-gray-900">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Refund & Cancellation</li>
            </ul>
          </div>
        </footer>
  
    </>
  )
}

export default Footer