import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserDataContext'
import { ListingDataContext } from '../context/ListingDataContext';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

function Card({title, landmark, city, image1, image2, image3, rent, ratings, id}) {
  const {userData} = useContext(UserDataContext);
  const {handleViewCard} = useContext(ListingDataContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if(userData) {
      handleViewCard(id);
    } else {
      navigate('/login');
    }
  }
  return (
    <div className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg cursor-pointer bg-slate-100' onClick={handleClick}>
        <div className='w-[100%] h-[67%] flex flex-row overflow-x-auto overflow-y-hidden rounded-lg scroll-smooth'>
          <img src={image1} alt="" className='w-[100%] h-[100%] object-cover flex-shrink-0'/>
          <img src={image2} alt="" className='w-[100%] h-[100%] object-cover flex-shrink-0'/>
          <img src={image3} alt="" className='w-[100%] h-[100%] object-cover flex-shrink-0'/>
        </div>

        <div className='w-[100%] h-[33%] py-[20px] flex flex-col gap-[2px]'>
          <div className='flex items-center justify-between text-[18px]'>
            <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>In {landmark.toUpperCase()}, {city.toUpperCase()}</span>
            <span className='flex items-center justify-center gap-[5px]'><FaStar className='text-[#eb6262]'/>{ratings}</span>
          </div>
            <span className='w-[80%] text-ellipsis overflow-hidden text-[15px] text-nowrap'>{title.toUpperCase()}</span>
            <span className='text-[16px] font-semibold text-[#986b6b]'>Rs.{rent}/day</span>
        </div>
    </div>
  )
}

export default Card