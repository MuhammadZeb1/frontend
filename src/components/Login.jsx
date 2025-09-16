import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/AuthSlice";
import axiosInstance from "../utils/axiosInstance";
import { Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion"; // ✅ import motion

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      toast.success(res.data.message || "User logged in successfully!");
      navigate("/");
      setFormData({ email: "", password: "" });
      dispatch(setCredentials({ token: res.data.token, user: res.data.role }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging in user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      {/* Animate form */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 bg-white rounded-2xl shadow-lg w-96"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.div
          className="flex justify-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
            Login
          </h1>
        </motion.div>

        {/* Email */}
        <motion.div
          className="flex flex-col gap-0.5"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <label htmlFor="email">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={getFormData}
              className="border border-gray-300 rounded px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
              placeholder="Enter your email"
            />
          </div>
        </motion.div>

        {/* Password */}
        <motion.div
          className="flex flex-col gap-0.5"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <label htmlFor="pass">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="password"
              name="password"
              id="pass"
              value={formData.password}
              onChange={getFormData}
              className="border border-gray-300 rounded px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="new-password"
              placeholder="Enter your password"
            />
          </div>
        </motion.div>

        {/* Login Button */}
        <motion.button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white text-xl px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-300 cursor-pointer w-full font-extrabold tracking-widest"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <LogIn className="w-6 h-6" />
          Login
        </motion.button>

        {/* Register Link */}
        <div className="text-center mt-2">
          <span>
            Don&apos;t have an account?{" "}
            <NavLink
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </NavLink>
          </span>
        </div>
      </motion.form>
    </div>
  );
}

export default Login;
