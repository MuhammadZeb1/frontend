import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:1212/auth/register", {
        name,
        email,
        password,
        role,
      });

      console.log("Response:", res.data);
      alert("User registered successfully");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error registering user");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="role">select role</label>
           <select name="role" id="role" value={role} onChange={(e)=> setRole(e.target.value)} >

            <option value="Customer">Customer</option>
            <option value="delivery">delivery</option>
            <option value="vendor">vendor</option>
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
