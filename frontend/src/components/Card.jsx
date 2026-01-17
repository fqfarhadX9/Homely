import React from 'react'

function Card({title, landmark, city, image1, image2, image3, rent, id}) {
  return (
    <div className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg cursor-pointer bg-slate-100'>
        <div className='w-[100%] h-[67%] overflow-auto rounded-lg'>
            <img src={image1} alt="" className='w-[100%] flex-shrink-0'/>
            <img src={image2} alt="" className='w-[100%] flex-shrink-0'/>
            <img src={image3} alt="" className='w-[100%] flex-shrink-0'/>
        </div>
        <div className='w-[100%] h-[33%] py-[20px] flex flex-col gap-[2px]'>
            <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>In {landmark.toUpperCase()}, {city.toUpperCase()}</span>
            <span className='w-[80%] text-ellipsis overflow-hidden text-[15px] text-nowrap'>{title.toUpperCase()}</span>
            <span className='text-[16px] font-semibold text-[#986b6b]'>Rs.{rent}/day</span>
        </div>
    </div>
  )
}

export default Card