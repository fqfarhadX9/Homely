import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListingDataContext } from '../context/ListingDataContext'
import { FaArrowLeftLong } from "react-icons/fa6"

function ListingPage3() {
  const navigate = useNavigate()  
  const {
    title, description, rent, city, landmark, category,
    frontendImage1, frontendImage2, frontendImage3,
    handleAddListing, adding
  } = useContext(ListingDataContext)

  return (
    <div className='mt-[2px] w-[100%] h-[100vh] flex items-center justify-center bg-[white] gap-[10px] flex-col 
    overflow-auto relative'>

      <div
        className='px-[18px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[5%]
        left-[20px] rounded-[30px] flex items-center gap-[8px] justify-center text-white'
        onClick={() => navigate('/ListingPage1')}
      >
        <FaArrowLeftLong className='w-[20px] h-[20px]' />
        <span className='text-[16px]'>Back</span>
      </div>

      <div className='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]'>
        <h1 className='text-[20px] md:text-[30px] text-[#272727] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]'>
          {`In ${landmark.toUpperCase()} , ${city.toUpperCase()}`}  
        </h1>
      </div>

      <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
        <div className='w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center'>
          <img src={frontendImage1} alt="image1" className='w-[100%]'/>
        </div>

        <div className='w-[100%] h-[30%] flex md:w-[30%] md:h-[100%] md:flex-col'>
          <div className='w-[100%] h-[100%] overflow-hidden'>
            <img src={frontendImage2} alt="image2" className='w-[100%]' />
          </div>
          <div className='w-[100%] h-[100%] overflow-hidden'>
            <img src={frontendImage3} alt="image3" className='w-[100%]' />
          </div>
        </div>
      </div>

      <div className='w-[95%] md:w-[80%] text-[18px] md:text-[25px]'>
        {`${title.toUpperCase()} ${category.toUpperCase()} , ${landmark.toUpperCase()}`}
      </div>

      <div className='w-[95%] md:w-[80%] text-[18px] md:text-[25px] text-gray-800'>
        {description.toUpperCase()}
      </div>

      <div className='w-[95%] md:w-[80%] text-[18px] md:text-[25px]'>
        {`Rs.${rent}/day`}
      </div>

      <div className='w-[95%] md:w-[80%] flex justify-start mt-[10px] mb-[30px]'>
        <button
          className='px-[30px] py-[10px] bg-red-500 text-[white] text-[18px] md:px-[100px] rounded-lg'
          onClick={handleAddListing}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add Listing"}
        </button>
      </div>

    </div>
  )
}

export default ListingPage3
