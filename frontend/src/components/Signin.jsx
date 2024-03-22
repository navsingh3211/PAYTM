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
  const [errorMsg,setErrorMsg] = useState('');
  const [successPopup,setSuccessPopup] = useState(false);
  const [valErrorMsg,setValErrorMsg] = useState('');

  const navigate = useNavigate();
  const LoginHandler = async(e)=>{
    e.preventDefault();
    let formData = {
      "email":email,
      "password":password
    }
    if(!formData.email || !formData.password){
      setErrorMsg('Please enter all fields');
      // alert('Plase enter all fields');
      return;
    }

    try{
      const response = await axios.post('http://13.126.161.186:8085/api/v1/user/login', formData);

      if(response.data.success){
        // console.log(response.data.data.token);
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('username', response.data.data.userName);
        setSuccessPopup(true);
        setErrorMsg('');
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 2000);
      }else{
        setValErrorMsg(response.data.message);
      }
    }catch(error){
      setTimeout(()=>{
        navigate('/error');
      },2000);
    }
  }
  
  function redirectFunc(){
    navigate('/');
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
        <label className="text-red-500">{errorMsg}</label><br></br>
        <label className="text-red-500">{valErrorMsg}</label><br></br>
        <label className="pt-0">Don't have an account? <a href="" className="underline" onClick={redirectFunc}>Sign Up</a></label>
      </div>
    </div>
    <Modal
        open={successPopup}
        onClose={() => setSuccessPopup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login Successful
          </Typography>
        </Box>
      </Modal>
      
    </>
  );
}