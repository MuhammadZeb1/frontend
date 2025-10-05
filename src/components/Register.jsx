import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import {
  User,
  Mail,
  Lock,
  IdCard,
  MapPin,
  Store,
  Users,
  Truck,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
    cnicNumber: "",
    shopName: "",
    shopType: "",
  });

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
      const res = await axiosInstance.post("/auth/register", formData);
      toast.success(res.data.message || "User registered successfully!");
      navigate("/login");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        address: "",
        cnicNumber: "",
        shopName: "",
        shopType: "",
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center  h-min-screen bg-gradient-to-r from-blue-100 to-blue-200 overflow-hidden">
      {/* Form Container with Entrance Animation */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Heading with Animation */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
            Register
          </h1>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <motion.div
            className="flex flex-col gap-1"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={getFormData}
                className="w-full outline-none"
                placeholder="Enter your full name"
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            className="flex flex-col gap-1"
            whileHover={{ scale: 1.02 }}
          >
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={getFormData}
                className="w-full outline-none"
                placeholder="Enter your email"
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div
            className="flex flex-col gap-1"
            whileHover={{ scale: 1.02 }}
          >
            <label htmlFor="pass" className="font-medium">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="password"
                id="pass"
                name="password"
                value={formData.password}
                onChange={getFormData}
                className="w-full outline-none"
                placeholder="Create a password"
              />
            </div>
          </motion.div>

          {/* CNIC */}
          <motion.div
            className="flex flex-col gap-1"
            whileHover={{ scale: 1.02 }}
          >
            <label htmlFor="cnicNumber" className="font-medium">
              CNIC Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <IdCard className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                id="cnicNumber"
                name="cnicNumber"
                value={formData.cnicNumber}
                onChange={getFormData}
                className="w-full outline-none"
                placeholder="Enter CNIC without dashes"
              />
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            className="flex flex-col gap-1 md:col-span-2"
            whileHover={{ scale: 1.02 }}
          >
            <label htmlFor="address" className="font-medium">
              Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={getFormData}
                className="w-full outline-none"
                placeholder="Enter your address"
              />
            </div>
          </motion.div>

          {/* Role Selection */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="font-medium">Select Role</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {[
                { value: "customer", label: "Customer", icon: Users },
                { value: "delivery", label: "Delivery", icon: Truck },
                { value: "vendor", label: "Vendor", icon: ShoppingBag },
              ].map((role) => (
                <motion.label
                  key={role.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    formData.role === role.value
                      ? { scale: 1.08, boxShadow: "0px 4px 15px rgba(0,0,0,0.15)" }
                      : { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }
                  }
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`cursor-pointer border rounded-xl p-2 flex flex-col items-center gap-1 transition-all ${
                    formData.role === role.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={getFormData}
                    className="hidden"
                  />
                  <role.icon className="w-8 h-8 text-blue-600" />
                  <span className="capitalize font-semibold">{role.label}</span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Vendor Fields */}
          {formData.role === "vendor" && (
            <>
              <motion.div
                className="flex flex-col gap-1"
                whileHover={{ scale: 1.02 }}
              >
                <label htmlFor="shopName" className="font-medium">
                  Shop Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                  <Store className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    id="shopName"
                    name="shopName"
                    value={formData.shopName}
                    onChange={getFormData}
                    className="w-full outline-none"
                    placeholder="Enter your shop name"
                  />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-1"
                whileHover={{ scale: 1.02 }}
              >
                <label htmlFor="shopType" className="font-medium">
                  Shop Type
                </label>
                <select
                  id="shopType"
                  name="shopType"
                  value={formData.shopType}
                  onChange={getFormData}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Shop Type --</option>
                  <option value="grocery">Grocery</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="mt-6 bg-blue-600 text-white text-xl px-6 py-3 rounded-xl w-full font-bold tracking-wide shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Register
        </motion.button>

        <div className="mt-4 text-center">
          <span>
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </NavLink>
          </span>
        </div>
      </motion.form>
    </div>
  );
}

export default Register;
