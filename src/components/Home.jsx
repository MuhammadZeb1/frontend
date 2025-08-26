import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/web-logo.png";
import {navLinks} from '../routes/Links';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/AuthSlice";

function Home() {
  const  {token,user} = useSelector((state) => state.auth);
  console.log(token,user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());   // redux + localStorage clear
    navigate("/login");   // login page پر redirect
  };

  return (
    <>
     <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 overflow-hidden">
  {/* Your content here */}
</div>

    </>
  );
}

export default Home;