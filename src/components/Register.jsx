import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { User, Mail, Lock, IdCard, MapPin, Store } from "lucide-react";
;

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
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 overflow-hidden">
  <form
    onSubmit={handleSubmit}
    className="bg-white rounded-lg shadow-md p-3 w-full max-w-4xl"
  >
    <div className="flex justify-center mb-6">
      <h1 className="text-4xl font-bold text-gray-800 tracking-wide">REGISTER</h1>
    </div>

    {/* Two-column grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Name */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="name">Name</label>
        <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={getFormData}
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="email">Email</label>
        <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={getFormData}
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="pass">Password</label>
        <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Lock className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="password"
            id="pass"
            name="password"
            value={formData.password}
            onChange={getFormData}
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* CNIC Number */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="cnicNumber">CNIC Number</label>
        <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <IdCard className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            id="cnicNumber"
            name="cnicNumber"
            value={formData.cnicNumber}
            onChange={getFormData}
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col gap-0.5 md:col-span-2">
        <label htmlFor="address">Address</label>
        <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <MapPin className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={getFormData}
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Role */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="role">Select Role</label>
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={getFormData}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Role --</option>
          <option value="customer">Customer</option>
          <option value="delivery">Delivery</option>
          <option value="vendor">Vendor</option>
        </select>
      </div>

      {/* Vendor specific fields */}
      {formData.role === "vendor" && (
        <>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="shopName">Shop Name</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Store className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                id="shopName"
                name="shopName"
                value={formData.shopName}
                onChange={getFormData}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <label htmlFor="shopType">Shop Type</label>
            <select
              id="shopType"
              name="shopType"
              value={formData.shopType}
              onChange={getFormData}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Shop Type --</option>
              <option value="grocery">Grocery</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="other">Other</option>
            </select>
          </div>
        </>
      )}
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="mt-6 bg-blue-600 text-white text-2xl px-4 py-2 rounded-2xl hover:bg-blue-700 transition duration-300 cursor-pointer w-full font-extrabold tracking-widest"
    >
      Register
    </button>

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
  </form>
</div>

  );
}

export default Register;
