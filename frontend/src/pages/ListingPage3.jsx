import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from '../context/ListingDataContext';
import { FaArrowLeftLong } from "react-icons/fa6";

function  ListingPage3() {
  const navigate = useNavigate();  
  const {title,
          setTitle,
          description,
          setDescription,
          rent,
          setRent,
          city,
          setCity,
          landmark,
          setLandmark,
          category,
          setCategory,
          backendImage1,
          setBackendImage1,
          backendImage2,
          setBackendImage2,
          backendImage3,
          setBackendImage3,
          frontendImage1,
          setFrontendImage1,
          frontendImage2, 
          setFrontendImage2,
          frontendImage3,
          setFrontendImage3,
          handleAddListing,
          adding, setAdding} = useContext(ListingDataContext);
  return (
    <div className='w-[100%] h-[100vh] flex items-center justify-center bg-[white] gap-[10px] flex-col 
    overflow-auto relative'>
      <div className='w-[50px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[5%]
      left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => navigate('/ListingPage1')}>
          <FaArrowLeftLong className='w-[25px] h-[25px] text-[white] '/>
      </div> 

      <div className='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]'>
        <h1 className='text-[20px] md:text-[30px] text-[#272727] text-ellipsis text-nowrap overflow-hidden'>
          {`In ${landmark.toUpperCase()} , ${city.toUpperCase()}`}  
        </h1>
      </div>

      <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
        <div className='w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center
        border-[2px] border-[white]'>
          <img src={frontendImage1} alt="image1" className='w-[100%]'/>
        </div>

        <div className='w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col'>
          <div className='w-[100%] h-[100%] flex items-center justify-center overflow-hidden border-[2px] border-[white] '>
            <img src={frontendImage2} alt="image2" className='w-[100%]' />
          </div>
          <div className='w-[100%] h-[100%] flex items-center justify-center overflow-hidden border-[2px] border-[white] '>
            <img src={frontendImage3} alt="image2" className='w-[100%]' />
          </div>
        </div>
      </div>
      <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
          {`${title.toUpperCase()} ${category.toUpperCase()} , ${landmark.toUpperCase()}`}
      </div>
      <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800'>
          {`${description.toUpperCase()}`}
        </div>
        <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
          {`Rs.${rent}/day `}
        </div>
        <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg
        absolute right-[5%] bottom-[5%]' onClick={handleAddListing} disabled={adding}>{adding ? "Adding..." : "Add Listing"}</button>
    </div>
  )
}

export default  ListingPage3