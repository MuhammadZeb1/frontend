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
  Image as ImageIcon,
  FolderUp
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
    image: null, // ✅ new field
  });
  console.log("form dara ",formData)

  const navigate = useNavigate();

  // ✅ Handle Form Inputs
  const getFormData = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = new FormData();
      if (formData.role !== "vendor") {
    delete formData.shopName;
    delete formData.shopType;
  }
      Object.entries(formData).forEach(([key, value]) => {
        sendData.append(key, value);
      });

      const response = await axiosInstance.post("/auth/register", sendData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message || "User registered successfully!");
  console.log("form dara ",formData)

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-min-screen bg-transparent overflow-hidden">
      <motion.form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-800">Register</h1>
        </motion.div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          

          {/* Name */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col gap-1">
            <label className="font-medium">Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={getFormData}
                className="w-full outline-none"
                placeholder="Enter your name"
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col gap-1">
            <label className="font-medium">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={getFormData}
                className="w-full outline-none"
                placeholder="Enter email"
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col gap-1">
            <label className="font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={getFormData}
                className="w-full outline-none"
                placeholder="Create a password"
              />
            </div>
          </motion.div>

          {/* CNIC */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col gap-1">
            <label className="font-medium">CNIC Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <IdCard className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="cnicNumber"
                value={formData.cnicNumber}
                onChange={getFormData}
                className="w-full outline-none"
                placeholder="Without dashes"
              />
            </div>
          </motion.div>
            {/* ✅ Image Upload */}
          {/* ✅ Image Upload with FolderUp Icon Button */}
<motion.div whileHover={{ scale: 1.02 }} className="flex flex-col gap-1">
  <label className="font-medium">Profile Image</label>
  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 justify-between">
    <div className="flex items-center gap-2">
      <FolderUp className="w-5 h-5 text-gray-500" />
      <span className="text-gray-600">
        {formData.image ? formData.image.name : "Upload your image"}
      </span>
    </div>

    {/* Hidden Input */}
    <input
      type="file"
      id="imageUpload"
      name="image"
      accept="image/*"
      onChange={getFormData}
      className="hidden"
    />

    {/* Custom Button */}
    <label
      htmlFor="imageUpload"
      className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-blue-600 transition"
    >
      Choose
    </label>
  </div>
</motion.div>

          {/* Address */}
          <motion.div whileHover={{ scale: 1.02 }} className=" flex flex-col  gap-1">
            <label className="font-medium">Address</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={getFormData}
                className="w-full outline-none"
                placeholder="Enter address"
              />
            </div>
          </motion.div>
          

          {/* ✅ Role Selection */}
          <div className="md:col-span-2">
            <label className="font-medium">Select Role</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              {[
                { value: "customer", label: "Customer", icon: Users },
                { value: "delivery", label: "Delivery", icon: Truck },
                { value: "vendor", label: "Vendor", icon: ShoppingBag },
              ].map((role) => (
                <motion.label
                  key={role.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center ${
                    formData.role === role.value ? "bg-blue-100 border-blue-500" : ""
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
                  <role.icon className="w-8 h-8 mb-2" />
                  <span>{role.label}</span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* ✅ Vendor Shop Fields */}
          {formData.role === "vendor" && (
            <>
              <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col gap-1">
                <label className="font-medium">Shop Name</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <Store className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={getFormData}
                    placeholder="Enter shop name"
                    className="w-full outline-none"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col gap-1">
                <label className="font-medium">Shop Type</label>
                <select
                  name="shopType"
                  value={formData.shopType}
                  onChange={getFormData}
                  className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
                >
                  <option value="">Select type</option>
                  <option value="grocery">Grocery</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="pharmacy">Pharmacy</option>
                </select>
              </motion.div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="mt-6 bg-blue-600 text-white py-3 rounded-lg w-full"
        >
          Register
        </motion.button>

        <div className="mt-4 text-center">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600">
            Login
          </NavLink>
        </div>
      </motion.form>
    </div>
  );
}

export default Register;
