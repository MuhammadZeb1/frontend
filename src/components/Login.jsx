import React from 'react'
import { NavLink } from 'react-router-dom'

function Login() {
  const handleSubmit = (e)=>{
    e.preventDefault();
   
  }
  return (
    <>
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <form 
       onClick={handleSubmit}
      className='flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-96'>
      <div className='flex justify-center'>
        <h1 className='text-4xl font-bold text-gray-800 tracking-wide'>
          Login
        </h1>
      </div>
       <div  className='flex flex-col gap-0.5'>
        <label htmlFor="email"> Email</label>
       <input type="email" name="email" id="email"
       className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
       />
       </div>
       <div className='flex flex-col gap-0.5'>
        <label htmlFor="pass"> Password</label>
       <input type="password" name="password" id="pass" 
       
       className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
       </div>
       <div className='flex justify-center '>
        <label htmlFor="button"></label>
       <input type="button" name="button" id="button" value="Login"
       className='bg-blue-600 text-white text-2xl px-4 py-2 rounded-2xl hover:bg-blue-700 transition duration-300 cursor-pointer w-screen font-extrabold 
        tracking-widest'
       />
       </div>
       <div>
        <span>
          Don't have an account? 
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
    <div>
      
    </div>
    </>
  )
}

export default Login