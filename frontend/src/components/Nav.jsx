import React from 'react'
import logo from '../assets/Homely (1).png'
// import logo2 from '../assets/Homely.png'
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { GiVikingLonghouse } from "react-icons/gi";
import { MdOutlinePool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin } from "react-icons/gi";
import { FaShopSlash } from "react-icons/fa6";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthDataContext } from '../context/AuthDataContext';

function Nav() {
    const [showpopup, setShowpopup] = useState(false);
    const navigate = useNavigate();
    const { serverUrl } = useContext(AuthDataContext);

    const handleLogout = async () => {
        try {
            const response = await axios.post(serverUrl + '/api/auth/logout', {withCredentials: true});
            console.log("Logout endpoint triggered:", response);
        } catch (error) {
            console.log("Logout Error:", error);
        }
    }
  return (
    <div>
        <div className='w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[20px] md:px-[40px] flex justify-between items-center'>
            <div>
                <img src={logo} alt="Homely Logo" className='w-[120px]' />
            </div>
            <div className='w-[35%] relative hidden md:block'>
                <input type="text" className='w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto
                rounded-[30px] text-[17px]' placeholder='Any Where  |  Any Location  |  Any City '/>
                <button className='absolute p-[10px] rounded-[50px] bg-[#ff0000]top-[5px] right-[3%]'><FiSearch className='text-[white] w-[20px] h-[20px]'/></button>
            </div>
            <div className='flex items-center justify-center gap-[10px] relative'>
                <span className='text-[18px] rounded-[50px] cursor-pointer hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block'>List Your Home</span>
                <button className='px-[20px] py-[10px] gap-[5px] border-[1px] border-[#8d8c8c] flex items-center justify-center
                hover:shadow-lg rounded-[50px]' onClick={() => setShowpopup(prev => !prev)}><span><GiHamburgerMenu className='w-[20px] h-[20px]'/></span> <span><CgProfile className='w-[23px] h-[23px]'/></span></button>
                {showpopup && <div className='w-[220px] h-[250px] bg-slate-50 absolute top-[110%] right-[3%] md:right-[10%] border-[#aaa9a9] border-[1px] z-10 rounded-lg'>
                    <ul className='w-[100%] h-[100%] text-[17px] py-[10px] flex items-start justify-around flex-col'>
                        <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={() => navigate("/login")}>Login</li>
                        <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={handleLogout}>Logout</li>
                        <div className='w-[100%] h-[1px] bg-[#c1c0c0]'></div>
                        <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer'>List Your Home</li>
                        <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer'>My Listing</li>
                        <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer'>Check Booking</li>
                    </ul>
                </div>}
            </div>
        </div>

        <div className='w-[100%] h-[60px] flex items-center justify-center md:hidden block'>
         <div className='w-[80%] relative'>
            <input type="text" className='w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto
            rounded-[30px] text-[17px]' placeholder='Any Where  |  Any Location  |  Any City '/>
            <button className='absolute p-[10px] rounded-[50px] bg-[#ff0000]top-[5px] right-[3%]'><FiSearch className='text-[white] w-[20px] h-[20px]'/></button>
        </div>
       </div>

        <div className='w-[100vw] h-[80px] bg-[white] flex justify-start md:justify-center px-[15px] items-center cursor-pointer gap-[50px] overflow-auto'>
            <div className='flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5]'>
                <MdWhatshot className='w-[30px] h-[30px] text-[black]' />
                <h3>Trending</h3>
            </div>
            <div className='flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5]'>
                <GiFamilyHouse className='w-[30px] h-[30px] text-[black]' />
                <h3>Villa</h3>
            </div>
            <div className='flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-nowrap'>
                <GiVikingLonghouse className='w-[30px] h-[30px] text-[black]' />
                <h3>Farm House</h3>
            </div>
            <div className='flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-nowrap'>
                <MdOutlinePool className='w-[30px] h-[30px] text-[black]' />
                <h3>Pool House</h3>
            </div>
            <div className='flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5]'>
                <MdBedroomParent className='w-[30px] h-[30px] text-[black]' />
                <h3>Rooms</h3>
            </div>
            <div className='flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5]'>
                <TbBuildingSkyscraper className='w-[30px] h-[30px] text-[black]' />
                <h3>Flat</h3>
            </div>
            <div className='flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5]'>
                <IoBedOutline className='w-[30px] h-[30px] text-[black]' />
                <h3>Pg</h3>
            </div>
            <div className='flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5]'>
                <GiWoodCabin className='w-[30px] h-[30px] text-[black]' />
                <h3>Cabins</h3>
            </div>
            <div className='flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5]'>
                <FaShopSlash className='w-[30px] h-[30px] text-[black]' />
                <h3>Shops</h3>
            </div>
        </div>
    </div>
  )
}

export default Nav