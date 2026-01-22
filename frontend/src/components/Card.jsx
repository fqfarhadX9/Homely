import React, { useContext, useState } from 'react'
import { UserDataContext } from '../context/UserDataContext'
import { ListingDataContext } from '../context/ListingDataContext';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { BookingDataContext } from '../context/BookingDataContext';

function Card({title, landmark, city, image1, image2, image3, rent, ratings, id, isBooked, host, bookingId}) {
  const {userData} = useContext(UserDataContext);
  const {handleViewCard} = useContext(ListingDataContext);
  const navigate = useNavigate();
  const [showPoppup, setShowPopup] = useState(false);
  const {cancelBooking} = useContext(BookingDataContext);

  const handleClick = () => {
    if(userData?.user) {
      handleViewCard(id);
    } else {
      navigate('/login');
    }
  }
  return (
    <div className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg cursor-pointer relative bg-slate-100 z-[10]' onClick={() => !isBooked ? handleClick() : null}>
       {isBooked && <div className='text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px]'>
          <GiConfirmed className='w-[20px] h-[20px] text-[green]'/>Booked
      </div>}
      {isBooked && bookingId && <div className='text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px]' onClick={(e) => {
  e.stopPropagation();
  setShowPopup(true);
}}><FcCancel className='w-[20px] h-[20px] text-[red]'/>Cancel Booking</div>}
      {showPoppup && <div className='w-[330px] h-[100px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg'>
        <div className='w-[100%] h-[50%] text-[#2e2d2d] flex items-start justify-center rounded-lg overflow-auto text-[20px] p-[10px]'>Booking Cancel!</div>
        <div className='w-[100%] h-[50%] text-[18px] font-semibold flex items-start justify-center gap-[10px] text-[#986b6b] '>Are You Sure ? <button className='px-[20px] bg-[red] text-[white] rounded-lg hover:bg-slate-600' onClick={(e) => { e.stopPropagation(); cancelBooking(bookingId);   console.log("Booking ID:", bookingId);
 setShowPopup(false);}}>Yes</button>
        <button className='px-[10px] bg-[red] text-[white] rounded-lg hover:bg-slate-600' onClick={() => setShowPopup(false)}>No</button></div>
      </div>}
        <div className='w-[100%] h-[67%] flex flex-row overflow-x-auto overflow-y-hidden rounded-lg scroll-smooth'>
          <img src={image1} alt="" className='w-[100%] h-[100%] object-cover flex-shrink-0'/>
          <img src={image2} alt="" className='w-[100%] h-[100%] object-cover flex-shrink-0'/>
          <img src={image3} alt="" className='w-[100%] h-[100%] object-cover flex-shrink-0'/>
        </div>

        <div className='w-[100%] h-[33%] py-[20px] flex flex-col gap-[2px]'>
          <div className='flex items-center justify-between text-[18px]'>
            <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>In {landmark?.toUpperCase()}, {city?.toUpperCase()}</span>
            <span className='flex items-center justify-center gap-[5px]'><FaStar className='text-[#eb6262]'/>{ratings}</span>
          </div>
            <span className='w-[80%] text-ellipsis overflow-hidden text-[15px] text-nowrap'>{title?.toUpperCase()}</span>
            <span className='text-[16px] font-semibold text-[#986b6b]'>Rs.{rent}/day</span>
        </div>
    </div>
  )
}

export default Card