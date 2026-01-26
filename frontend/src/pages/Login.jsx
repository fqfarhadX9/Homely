import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import google_logo from '../assets/Google-Logo-PNG-Image.webp'
import { IoEyeOutline, IoEye } from "react-icons/io5"
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios'
import { AuthDataContext } from '../context/AuthDataContext'
import { UserDataContext } from '../context/UserDataContext'
import { toast } from 'react-toastify'

function Login() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {userData, setUserData} = useContext(UserDataContext)
    const navigate = useNavigate()
    const { serverUrl, loading, setLoading } = useContext(AuthDataContext);

    const handleLogin = async(e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post(serverUrl + '/api/auth/signin', {
          email, password
        }, {withCredentials: true});
        setLoading(false);
        setUserData(response.data.user);
        toast.success("Login Successfully");
        setTimeout(() => {
          navigate("/");
        }, 800);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(error.response?.data?.message || "Login Failed");
      }
    }

    return (
      <div className='w-screen h-screen flex flex-col items-center justify-start relative'>
        
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-[8px] bg-red-500 cursor-pointer absolute top-[8%] left-[20px]
          px-[14px] py-[10px] rounded-full hover:bg-red-600 transition"
        >
          <FaArrowLeftLong className="w-[20px] h-[20px] text-white" />
          <span className="text-white text-[15px] font-medium">Back</span>
        </div>

        <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
          <span className='text-[25px] font-semibold'>Log in</span>
          <span className='text-[16px] text-xl'>Welcome to Homely</span>
        </div>

        <div className='max-w-[600px] w-[90%] h-[600px] bg-[white] border-[1px] border-gray-200
        backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
          <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>

            <div className='w-[90%] h-[50px] bg-red-300 text-white rounded-lg flex items-center justify-center
            gap-[10px] py-[20px] cursor-pointer'>
              <img src={google_logo} className='w-[20px]'/>Login with Google
            </div>

            <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
              <div className='w-[40%] h-[1px] bg-[#96969635] '></div>OR<div className='w-[40%] h-[1px] bg-[#96969635] '></div>
            </div>

            <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>

              <input 
                type="text" 
                className='w-[100%] h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent px-[20px] 
                           placeholder-[#ffffff7] font-semibold
                           focus:outline-none focus:border-red-500 focus:shadow-lg hover:border-red-500 hover:shadow-md transition'
                placeholder='email' 
                required 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
              />

              <input 
                type={show ? "text" : "password"} 
                className='w-[100%] h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent px-[20px] 
                           placeholder-[#ffffff7] font-semibold
                           focus:outline-none focus:border-red-500 focus:shadow-lg hover:border-red-500 hover:shadow-md transition'
                placeholder='password' 
                required 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
              />

              {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[55%]' 
              onClick={()=>setShow(prev=>!prev)}/>}
              {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[55%]'
              onClick={()=>setShow(prev=>!prev)}/>}

              <button className='w-[100%] h-[50px] bg-red-600 rounded-lg flex items-center
              justify-center mt-[20px] text-[17px] font-semibold text-white' disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </button>

              <p className='flex gap-[10px]'>
                You don't have an Account?
                <span className='text-red-600 text-[17px] font-semibold cursor-pointer' onClick={()=> navigate("/signup")}>
                  Registration
                </span>
              </p>
            </div>

          </form>
        </div>
      </div>
    )
}

export default Login
