import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { UserDataContext } from '../context/UserDataContext';
import Card from '../components/Card';

function MyListing() {
    const navigate = useNavigate();
    const {userData} = useContext(UserDataContext);
    console.log("new user data", userData);
    const listings = userData.user.listing;
    console.log("listings: ", listings)
  return (
    <div className='w-[100%] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative'>
        <div className='w-[50px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[5%]
        left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => navigate('/')}>
                <FaArrowLeftLong className='w-[25px] h-[25px] text-[white] '/>
        </div> 
        <div className='w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center
        text-[30px] rounded-md text-[#613b3b] font-semibold mt-[20px] md:w-[600px] '>
            My Listing
        </div>
        <div className='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]'>
            {userData?.user.listing.map((list) => (
                <Card title={list.title} landmark={list.landmark} city={list.city} image1={list.image1} image2={list.image2}
                image3={list.image3} rent={list.rent} id={list._id}/>
            ))}
        </div>
    </div>
  )
}

export default MyListing