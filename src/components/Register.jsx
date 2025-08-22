import axios from "axios";
import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();


  // handle input changes
  const getFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, role } = formData;

    

    try {
      const res = await axios.post("http://localhost:1212/auth/register", {
        name,
        email,
        password,
        role,
      });

      console.log("Response:", res.data);
      toast.success(res.data.message || "User registered successfully!");
      
      navigate("/login")
    } catch (error) {
      console.log("")
      console.error("Error:", error.response?.data || error.message);
      // toast.error(error.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-96"
      >
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
            REGISTER
          </h1>
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            name="password"
            value={formData.password}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="role">Select Role</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Role --</option>
            <option value="customer">Customer</option>
            <option value="delivery">Delivery</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white text-2xl px-4 py-2 rounded-2xl hover:bg-blue-700 transition duration-300 cursor-pointer w-full font-extrabold tracking-widest"
        >
          Register
        </button>

        <div>
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
