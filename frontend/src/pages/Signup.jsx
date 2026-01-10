import React, { useContext, useState } from 'react'
import google_logo from '../assets/Google-Logo-PNG-Image.webp'
import { IoEye } from "react-icons/io5"
import { IoEyeOutline } from "react-icons/io5"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthDataContext } from '../context/AuthDataContext';
import { UserDataContext } from '../context/UserDataContext';

function Signup() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { serverUrl } = useContext(AuthDataContext);
    const {userData, setUserData} = useContext(UserDataContext);

    const handleSignup = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.post(serverUrl + '/api/auth/signup', {
          name, email, password
        });
        console.log(response)
        setUserData(response.data.user);
        navigate("/");

      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className='w-screen h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] 
    text-white flex flex-col items-center justify-start relative'>

      <div className='w-[50px] h-[50px] bg-[#6060f5] cursor-pointer absolute top-[10%]
      left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => navigate('/')}>
        <FaArrowLeftLong className='w-[25px] h-[25px] text-[white] '/>
      </div>  
      
      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span className='text-[16px]'>Welcome to Homely</span>
      </div>
      <div className='max-w-[600px] w-[90%] h-[600px] bg-[#00000025] border-[1px] border-[#96969635]
      backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form action="" onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center
          gap-[10px] py-[20px] cursor-pointer'>
            <img src={google_logo} className='w-[20px]'/>Registration with Google
          </div>
          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635] '></div>OR<div className='w-[40%] h-[1px] bg-[#96969635] '></div>
          </div>
          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
            <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] 
            backdrop:blur-sm rounded lg shadow-lg bg-transparent placeholder-[#ffffff7] px-[20px] 
            font-sembold' placeholder='username' required onChange={(e) => setName(e.target.value)} value={name}/>

            <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] 
            backdrop:blur-sm rounded lg shadow-lg bg-transparent placeholder-[#ffffff7] px-[20px] 
            font-sembold' placeholder='email' required onChange={(e) => setEmail(e.target.value)} value={email}/>

            <input type={show ? "text" : "password" } className='w-[100%] h-[50px] border-[2px] border-[#96969635] 
            backdrop:blur-sm rounded lg shadow-lg bg-transparent placeholder-[#ffffff7] px-[20px] 
            font-sembold' placeholder='password' required onChange={(e) => setPassword(e.target.value)} value={password}/>

            {!show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] cursor-pointer' onClick={() => setShow(prev => !prev)}/>}
            {show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] cursor-pointer' onClick={() => setShow(prev => !prev)}/>}

            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center
            justify-center mt-[20px] text-[17px] font-sembold'>Signup</button>
            <p className='flex gap-[10px]'>You have any Account?<span className='text-[#5555f6c5]
            text-[17px] font semibold cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup