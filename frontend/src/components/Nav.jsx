import React, { useEffect } from 'react'
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
import { UserDataContext } from '../context/UserDataContext';
import { ListingDataContext } from '../context/ListingDataContext';

function Nav() {
    const [showpopup, setShowpopup] = useState(false);
    const navigate = useNavigate();
    const { serverUrl } = useContext(AuthDataContext);
    const {userData, setUserData} = useContext(UserDataContext);
    const [cat, setCat] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const {listingData, setNewListingData, handleSearch, searchData, handleViewCard} = useContext(ListingDataContext);



    const handleLogout = async () => {
        try {
            const response = await axios.post(serverUrl + '/api/auth/logout', {withCredentials: true});
            console.log("Logout endpoint triggered:", response);
            setUserData(null);
        } catch (error) {
            console.log("Logout Error:", error);
        }
    }

    const handleCategory = (category) => {
        setCat(category);
        if(category == "trending") {
            setNewListingData(listingData);
        } else {
            const filteredData = listingData.filter((listing) => listing.category == category);
            setNewListingData(filteredData);
        }
    }

    const handleClick = (id) => {
      if(userData?.user) {
        handleViewCard(id);
    } else {
      navigate('/login');
    }
  }

    useEffect(() => {
        handleSearch(searchInput);
    }, [searchInput]);
  return (
    <div className='fixed top-0 bg-[white] z-[20]'>
        <div className='w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[20px] md:px-[40px] flex justify-between items-center'>
            <div>
                <img src={logo} alt="Homely Logo" className='w-[120px]' />
            </div>
            <div className='w-[35%] relative hidden md:block'>
                <input type="text" className='w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto
                rounded-[30px] text-[17px]' placeholder='Any Where  |  Any Location  |  Any City' onChange={(e) => setSearchInput(e.target.value)}  value={searchInput}/>
                <button className='absolute p-[10px] rounded-[50px] bg-[#ff0000] top-[5px] right-[3%]'><FiSearch className='text-[white] w-[20px] h-[20px]'/></button>
            </div>
            <div className='flex items-center justify-center gap-[10px] relative'>
                <span className='text-[18px] rounded-[50px] cursor-pointer hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block' onClick={()=>{navigate("/listingpage1"); setShowpopup(false)}}>Become a Host</span>
                <button className='px-[20px] py-[10px] gap-[5px] border-[1px] border-[#8d8c8c] flex items-center justify-center
                hover:shadow-lg rounded-[50px]' onClick={() => setShowpopup(prev => !prev)}>
                    <span><GiHamburgerMenu className='w-[20px] h-[20px]'/></span> 
                    {userData == null && <span><CgProfile className='w-[23px] h-[23px]'/></span>}
                    {userData != null && <span className='w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center'>
                        {userData?.user.name.slice(0,1) }</span>}
                </button>
                {showpopup && <div className='w-[220px] h-[250px] bg-slate-50 absolute top-[110%] right-[3%] md:right-[10%] border-[#aaa9a9] border-[1px] z-10 rounded-lg'>
                    <ul className='w-[100%] h-[100%] text-[17px] py-[10px] flex items-start justify-around flex-col'>
                       {!userData && <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={() => navigate("/login")}>Login</li>}
                        {userData && <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={()=>{handleLogout; setShowpopup(false)}}>Logout</li>}
                        <div className='w-[100%] h-[1px] bg-[#c1c0c0]'></div>
                        <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={() => {navigate("/listingpage1"); setShowpopup(false)}}>Become a Host</li>
                        <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={() => {navigate("/mylisting"); setShowpopup(false)}}>My Listing</li>
                        <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={() => {navigate("/mybooking"); setShowpopup(false)}}>My Booking</li>
                    </ul>
                </div>}
            </div>

            {searchData?.length > 0 && <div className='w-[100vw] h-[450px] flex flex-col gap-[20px] absolute top-[50%] overflow-auto left-[0] justify-start items-center'>
                <div className='max-w-[700px] w-[100vw] h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] p-[20px] rounded-lg border-[1px]
                border-[#a2a1a1] cursor-pointer'>
                    {searchData.map((item) => (
                        <div className='border-b border-[black] p-[10px]' onClick={() => handleClick(item._id)}>{item.title} In {item.landmark}, {item.city}</div>
                    ))}
                </div>
            </div>}
        </div>

        <div className='w-[100%] h-[60px] flex items-center justify-center block md:hidden'>
         <div className='w-[80%] relative'>
            <input type="text" className='w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto
            rounded-[30px] text-[17px]' placeholder='Any Where  |  Any Location  |  Any City' onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
            <button className='absolute p-[10px] rounded-[50px] bg-[#ff0000] top-[5px] right-[3%]'><FiSearch className='text-[white] w-[20px] h-[20px]'/></button>
        </div>
       </div>

        <div className='w-[100vw] h-[80px] bg-[white] flex justify-start md:justify-center px-[15px] items-center cursor-pointer gap-[50px] overflow-auto'>
            <div className='flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
                <MdWhatshot className='w-[30px] h-[30px] text-[black]' onClick={() => {handleCategory("trending"); setCat("");}}/>
                <h3>Trending</h3>
            </div>
            <div className={`flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-[13px]
                ${cat == "villa" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("villa")}>
                <GiFamilyHouse className='w-[30px] h-[30px] text-[black]'/>
                <h3>Villa</h3>
            </div>
            <div className={`flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-[13px]
                ${cat == "farmHouse" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("farmHouse")}>
                <GiVikingLonghouse className='w-[30px] h-[30px] text-[black]' />
                <h3>Farm House</h3>
            </div>
            <div className={`flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-[13px] 
                ${cat == "poolHouse" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("poolHouse")}>
                <MdOutlinePool className='w-[30px] h-[30px] text-[black]' />
                <h3>Pool House</h3>
            </div>
            <div className={`flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-[13px]
                ${cat == "bedroom" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("bedroom")}>
                <MdBedroomParent className='w-[30px] h-[30px] text-[black]' />
                <h3>Rooms</h3>
            </div>
            <div className={`flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-[13px]
                ${cat == "flat" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("flat")}>
                <TbBuildingSkyscraper className='w-[30px] h-[30px] text-[black]' />
                <h3>Flat</h3>
            </div>
            <div className={`flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-[13px]
                ${cat == "pg" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("pg")}>
                <IoBedOutline className='w-[30px] h-[30px] text-[black]' />
                <h3>Pg</h3>
            </div>
            <div className={`flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-[13px]
                ${cat == "cabin" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("cabin")}>
                <GiWoodCabin className='w-[30px] h-[30px] text-[black]' />
                <h3>Cabins</h3>
            </div>
            <div className={`flex flex-col justify-center items-center hover:border-b-[1px] border-[#a6a5a5] text-[13px]
                ${cat == "shops" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("shops")} >
                <FaShopSlash className='w-[30px] h-[30px] text-[black]' />
                <h3>Shops</h3>
            </div>
        </div>
    </div>
  )
}

export default Nav