import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // ✅ axios import
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/AuthSlice"; // ✅ import the action
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navgiate = useNavigate()

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
      const res = await axios.post("http://localhost:1212/auth/login", formData);
      console.log("Response:", res.data);
      toast.success(res.data.message || "User logged in successfully!");
      navgiate("/")
      
      // Dispatch the setCredentials action with the response data
      dispatch(setCredentials({ token: res.data.token, user: res.data.role }));

     
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging in user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit} // ✅ Correct way
        className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-96"
      >
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
            Login
          </h1>
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            name="password"
            id="pass"
            value={formData.password}
            onChange={getFormData}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit" // ✅ submit button
            className="bg-blue-600 text-white text-2xl px-4 py-2 rounded-2xl hover:bg-blue-700 transition duration-300 cursor-pointer w-full font-extrabold tracking-widest"
          >
            Login
          </button>
        </div>

        <div>
          <span>
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </NavLink>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
