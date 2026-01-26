import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { UserDataContext } from "../context/UserDataContext";
import Card from "../components/Card";

function MyListing() {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);

  const listings = userData?.user?.listing || [];

  return (
    <div className="w-full min-h-screen flex flex-col px-[20px]">
      
      <div className="w-full relative mt-[30px] flex items-center">
        <div
          className="w-[45px] h-[45px] bg-[#f14242] cursor-pointer
          rounded-full flex items-center justify-center
          absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => navigate("/")}
        >
          <FaArrowLeftLong className="w-[22px] h-[22px] text-white" />
        </div>

        <div className="mx-auto w-[60%] md:w-[600px] border-[2px] border-[#908c8c]
          p-[12px] text-[24px] sm:text-[26px] md:text-[30px]
          rounded-md text-[#613b3b] font-semibold
          whitespace-nowrap text-center"
        >
          My Listing
        </div>
      </div>
      
      <div className="w-full flex items-center justify-center gap-[25px] flex-wrap mt-[40px]">
        {listings.length > 0 ? (
          listings.map((list) => (
            <Card
              key={list._id}
              title={list.title}
              landmark={list.landmark}
              city={list.city}
              image1={list.image1}
              image2={list.image2}
              image3={list.image3}
              rent={list.rent}
              id={list._id}
              ratings={list.ratings}
              isBooked={list.isBooked}
              host={list.host}

            />
          ))
        ) : (
          <p className="text-gray-500 text-[18px] mt-[30px]">
            No listings found
          </p>
        )}
      </div>
    </div>
  );
}

export default MyListing;





// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { UserDataContext } from '../context/UserDataContext';
// import Card from '../components/Card';

// function MyListing() {
//     const navigate = useNavigate();
//     const {userData} = useContext(UserDataContext);
//     console.log("new user data", userData);
//     const listings = userData?.user?.listing || [];
//     console.log("listings: ", listings)
//   return (
//     <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative px-[20px]'>
//         <div className='w-[50px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[10%]
//         left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => navigate('/')}>
//                 <FaArrowLeftLong className='w-[25px] h-[25px] text-[white] '/>
//         </div> 
//         <div className='w-[60%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center
//         text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] md:w-[600px] text-nowrap'>
//             My Listing
//         </div>
//         <div className='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]'>
//             {userData?.user.listing.map((list) => (
//                 <Card title={list.title} landmark={list.landmark} city={list.city} image1={list.image1} image2={list.image2}
//                 image3={list.image3} rent={list.rent} id={list._id}/>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default MyListing