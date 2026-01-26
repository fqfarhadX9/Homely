import React, { useContext, useState } from 'react'
import { IoEye, IoEyeOutline } from "react-icons/io5"
import { FaArrowLeftLong } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthDataContext } from '../context/AuthDataContext'
import { UserDataContext } from '../context/UserDataContext'
import { toast } from 'react-toastify'

function Signup() {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { serverUrl, loading, setLoading } = useContext(AuthDataContext)
  const { setUserData } = useContext(UserDataContext)

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(serverUrl + '/api/auth/signup', {
        name, email, password
      })
      setUserData(response.data.user)
      setLoading(false)
      toast.success("Signup Successfully")
      setTimeout(() => {
       navigate("/")
      }, 2000)
    } catch (error) {
      setLoading(false)
      toast.error("Signup Failed")
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

      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-[8px]'>
        <span className='text-[26px] font-semibold'>Signup / Registration</span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[600px] bg-white border border-gray-200 rounded-lg shadow-lg flex items-center justify-center'>
        <form
          onSubmit={handleSignup}
          className='w-[90%] h-[90%] flex flex-col items-center justify-center gap-[16px]'
        >
          <h2 
            className='text-2xl font-bold mb-4 text-gray-700'
          >
            Welcome to Homely
          </h2>

          <input
            type="text"
            className='w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent px-[20px] 
                       focus:outline-none focus:border-red-500 focus:shadow-lg hover:border-red-500 hover:shadow-md transition'
            placeholder='username'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className='w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent px-[20px] 
                       focus:outline-none focus:border-red-500 focus:shadow-lg hover:border-red-500 hover:shadow-md transition'
            placeholder='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              className='w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent px-[20px] 
                         focus:outline-none focus:border-red-500 focus:shadow-lg hover:border-red-500 hover:shadow-md transition'
              placeholder='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!show && (
              <IoEye
                className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px]
                text-red-500 cursor-pointer"
                onClick={() => setShow(true)}
              />
            )}

            {show && (
              <IoEyeOutline
                className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px]
                text-red-600 cursor-pointer"
                onClick={() => setShow(false)}
              />
            )}
          </div>

          <button
            className='w-full h-[50px] bg-red-500 hover:bg-red-600 transition rounded-lg
            flex items-center justify-center text-[17px] font-semibold text-white mt-[10px]'
            disabled={loading}
          >
            {loading ? "Loading..." : "Signup"}
          </button>

          <p className='flex gap-[6px] justify-center'>
            You have any Account?
            <span
              className='text-red-600 text-[16px] font-semibold cursor-pointer'
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Signup
