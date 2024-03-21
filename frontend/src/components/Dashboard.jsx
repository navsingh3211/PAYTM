/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import SendMoneyPopUp from './SendMoneyPopUp';

export default function Dashboard(){
  const [balance,setBalance] = useState(0);
  const [users,setUsers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [friendId,setFriendId] = useState('');
  const [frindName,setFriendName] = useState('');

  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  useEffect(()=>{
    const fetchBalance = async ()=>{
      let response = await axios.get('http://13.126.161.186:8085/api/v1/account/account-balance',{
        headers:{
          token:token
        }
      });
      setBalance(response.data.balance)
      // console.log(response.data.balance,'balance');
    }
    fetchBalance();
  },[]);

  useEffect(()=>{
    const fetchUsers = async ()=>{
      let response = await axios.get('http://13.126.161.186:8085/api/v1/user/bulk/listing',{
        headers:{
          token:token
        }
      });
      setUsers(response.data.data)
      // console.log(response.data.data,'users');
    }
    fetchUsers();
  },[]);


  return <>
    <div className="bg-white h-[100vh]">
      <div className="text-left font-bold text-2xl">
        Payments App: 
        <p className="text-right font-bold">Hello,{username}</p>
      </div>
      <div className="text-left font-bold text-2xl">
        Your Balance is: ${balance}
      </div><br />
      <div className="text-left font-bold text-2xl">
        Users:
        <ul>
          {
            users.map((user)=>(
              <li key={user._id}>
                {user.firstName + ' ' + user.lastName}

                <button 
                  type="submit" 
                  onClick={()=>{
                    setIsPopupOpen(true);
                    setFriendName(user.firstName + ' ' + user.lastName);
                    setFriendId(user._id)
                  }} 
                  className="bg-black text-white border-2 font-bold m-5 px-10 py-px rounded-lg"
                >send money</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
    {
      isPopupOpen && (
        <SendMoneyPopUp 
          frindName={frindName} 
          friendId={friendId}
          onClose={() => setIsPopupOpen(false)}
        />
      )
    }
  </>
}