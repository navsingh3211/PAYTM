/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Signin() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();
  function LoginHandler(){
    
  }
  
  function redirectFunc(){
    navigate('/signup');
  }
  
  return (
    <>
    
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-40 pt-20 shadow w-[500px] rounded">
        <label htmlFor="fn" className="font-bold text-2xl">Sign In</label> <br /> 
        <label htmlFor="fn" className="text-stone-600">Enter your credentails to access an account</label> <br />
        <br></br>
       

        <label htmlFor="em" className="text-xl">Email</label> <br />
        <input onChange={(e)=>setEmail(e.target.value)} 
        id="em" type="text" placeholder="Enter email" className="border-gray-600 border-2 rounded-lg"/><br />

        <label htmlFor="ps" className="text-xl">Password</label> <br />
        <input onChange={(e)=>setPassword(e.target.value)}  
        id="ps" type="text" placeholder="Enter password" className="border-gray-600 border-2 rounded-lg"/><br />
        
        <button type="submit" onClick={LoginHandler}
          className="bg-black text-white border-2 font-bold m-5 px-10 py-px rounded-lg">Sign In</button>
        <br></br>
      
        <label className="pt-0">Don't have an account? <a href="#" className="underline" onClick={redirectFunc}>Sign Up</a></label>

      </div>
    </div>
      
    </>
  );
}