/* eslint-disable react/prop-types */

import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function SendMoneyPopUp({ frindName, friendId, onClose }) {
  const [amount, setAmount] = useState("");
  const [successPopup,setSuccessPopup] = useState(false);
  const [errorMsg,setErrorMsg] = useState('');
  const [valErrorMsg,setValErrorMsg] = useState('');

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      to: friendId,
      amount: Number(amount),
    };
    const response = await axios.post(
      "http://13.126.161.186:8085/api/v1/account/transfer-money",
      formData,
      {
        headers: {
          // Include the token in the request headers
          token: token,
        },
      }
    );
    if (response.data.success) {
      setSuccessPopup(true);
     
        setErrorMsg('');
    }else{
      setValErrorMsg(response.data.message);
    }
    // Close the popup
    
  };
  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-md p-6">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Friend Name:({frindName})</h1>
          <h2 className="text-xl font-bold mb-4">Send Money</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="block w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Transfer amount
          </button>
          <label className="text-red-500">{errorMsg}</label><br></br>
        <label className="text-red-500">{valErrorMsg}</label><br></br>
        </div>
      </div>
      <Modal
        open={successPopup}
        onClose={() => {
          setSuccessPopup(false);
          onClose();
          setTimeout(() => {
            navigate('/dashboard'); 
          }, 2000);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Money has been tranfered successfully.
          </Typography>
          
        </Box>
      </Modal>
    </>
  );
}
