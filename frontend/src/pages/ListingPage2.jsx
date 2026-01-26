import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import { GiFamilyHouse, GiVikingLonghouse, GiWoodCabin } from "react-icons/gi"
import { MdOutlinePool, MdBedroomParent } from "react-icons/md"
import { TbBuildingSkyscraper } from "react-icons/tb"
import { IoBedOutline } from "react-icons/io5"
import { FaShopSlash } from "react-icons/fa6"
import { ListingDataContext } from '../context/ListingDataContext'

function ListingPage2() {
  const navigate = useNavigate()
  const { category, setCategory } = useContext(ListingDataContext)

  const commonCardStyle =
    "w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] text-[16px] rounded-lg transition-all duration-200 hover:border-red-500 hover:text-red-500"

  return (
    <div className='w-[100%] h-[100vh] flex items-center justify-center bg-white overflow-auto relative'>

      <div
        className='px-[18px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[5%]
        left-[20px] rounded-[30px] flex items-center gap-[8px] justify-center text-white'
        onClick={() => navigate('/ListingPage1')}
      >
        <FaArrowLeftLong className='w-[20px] h-[20px]' />
        <span className='text-[16px]'>Back</span>
      </div>

      <div className='w-[200px] h-[50px] text-[20px] bg-red-500 text-[white] flex items-center justify-center
      rounded-[30px] absolute top-[5%] right-[10px] shadow-lg'>
        Set Your Category
      </div>

      <div className='max-w-[900px] w-[100%] h-[550px] overflow-auto bg-white flex items-center justify-start
      flex-col gap-[40px] mt-[30px]'>

        <h1 className='text-[black] text-[18px] md:text-[30px] px-[10px]'>
          Which of these best describes your place?
        </h1>

        <div className='max-w-[900px] w-[100%] md:w-[70%] h-[100%] flex flex-wrap items-center justify-center gap-[15px]'>

          <div className={`${commonCardStyle} ${category === "villa" ? "border-red-500 text-red-500" : ""}`}
            onClick={() => setCategory("villa")}>
            <GiFamilyHouse className='w-[30px] h-[30px]' />
            <h3>Villa</h3>
          </div>

          <div className={`${commonCardStyle} ${category === "farmHouse" ? "border-red-500 text-red-500" : ""}`}
            onClick={() => setCategory("farmHouse")}>
            <GiVikingLonghouse className='w-[30px] h-[30px]' />
            <h3>Farm House</h3>
          </div>

          <div className={`${commonCardStyle} ${category === "poolHouse" ? "border-red-500 text-red-500" : ""}`}
            onClick={() => setCategory("poolHouse")}>
            <MdOutlinePool className='w-[30px] h-[30px]' />
            <h3>Pool House</h3>
          </div>

          <div className={`${commonCardStyle} ${category === "bedroom" ? "border-red-500 text-red-500" : ""}`}
            onClick={() => setCategory("bedroom")}>
            <MdBedroomParent className='w-[30px] h-[30px]' />
            <h3>Bedroom</h3>
          </div>

          <div className={`${commonCardStyle} ${category === "flat" ? "border-red-500 text-red-500" : ""}`}
            onClick={() => setCategory("flat")}>
            <TbBuildingSkyscraper className='w-[30px] h-[30px]' />
            <h3>Flat</h3>
          </div>

          <div className={`${commonCardStyle} ${category === "pg" ? "border-red-500 text-red-500" : ""}`}
            onClick={() => setCategory("pg")}>
            <IoBedOutline className='w-[30px] h-[30px]' />
            <h3>Pg</h3>
          </div>

          <div className={`${commonCardStyle} ${category === "cabin" ? "border-red-500 text-red-500" : ""}`}
            onClick={() => setCategory("cabin")}>
            <GiWoodCabin className='w-[30px] h-[30px]' />
            <h3>Cabin</h3>
          </div>

          <div className={`${commonCardStyle} ${category === "shops" ? "border-red-500 text-red-500" : ""}`}
            onClick={() => setCategory("shops")}>
            <FaShopSlash className='w-[30px] h-[30px]' />
            <h3>Shops</h3>
          </div>

        </div>

        <button
          className='px-[50px] py-[10px] bg-red-500 text-[white] text-[18px] md:px-[100px] rounded-lg absolute
          right-[5%] bottom-[5%] disabled:opacity-50'
          onClick={() => navigate("/listingPage3")}
          disabled={!category}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ListingPage2
