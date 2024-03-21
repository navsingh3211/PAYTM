import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Signup() {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [successPopup,setSuccessPopup] = useState(false);
  const [errorMsg,setErrorMsg] = useState('');
  const [valErrorMsg,setValErrorMsg] = useState('');

  
  const navigate = useNavigate();
  const signupHandler = async (e)=>{
    e.preventDefault();
    let formData = {
      "email":email,
      "firstName":firstName,
      "lastName":lastName,
      "password":password
    }
    if(!formData.email || !formData.firstName || !formData.lastName || !formData.password){
      setErrorMsg('Please enter all fields');
      // alert('Plase enter all fields');
      return;
    }

    try{
    
      const response = await axios.post('http://13.126.161.186:8085/api/v1/user/register', formData);

      if(response.data.success){
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
    navigate('/signin');
  }
  return (
    <>
    
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-40 pt-20 shadow w-[500px] rounded">
        <label htmlFor="fn" className="font-bold text-2xl">Sign Up</label> <br /> 
        <label htmlFor="fn" className="text-stone-600">Enter your information to create an account</label> <br />
        <br></br>
        <label htmlFor="fn" className="text-xl">First Name</label> <br />
        <input 
        onChange={(e)=>setFirstName(e.target.value)} 
        id="fn" type="text" placeholder="Enter first Name" className="border-gray-600 border-2 rounded-lg"/> <br />

        <label htmlFor="ln" className="text-xl">Last Name</label> <br />
        <input onChange={(e)=>setLastName(e.target.value)} 
        id="ln" type="text" placeholder="Enter last Name" className="border-gray-600 border-2 rounded-lg"/><br />

        <label htmlFor="em" className="text-xl">Email</label> <br />
        <input onChange={(e)=>setEmail(e.target.value)} 
        id="em" type="text" placeholder="Enter email" className="border-gray-600 border-2 rounded-lg"/><br />

        <label htmlFor="ps" className="text-xl">Password</label> <br />
        <input onChange={(e)=>setPassword(e.target.value)}  
        id="ps" type="text" placeholder="Enter password" className="border-gray-600 border-2 rounded-lg"/><br />
        
        <button type="submit" onClick={signupHandler}
        className="bg-black text-white border-2 font-bold m-5 px-10 py-px rounded-lg">Sign up</button>
        <br></br>
        <label className="text-red-500">{errorMsg}</label><br></br>
        <label className="text-red-500">{valErrorMsg}</label><br></br>
        <label className="pt-0">Already have an account? <a href="#" className="underline" onClick={redirectFunc}>Login</a></label>
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
            Signup Successful
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Thank you for signing up!
          </Typography>
        </Box>
      </Modal>
    </>
  );
}