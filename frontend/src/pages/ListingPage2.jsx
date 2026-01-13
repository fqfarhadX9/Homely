import React, { useContext} from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { GiFamilyHouse } from "react-icons/gi";
import { GiVikingLonghouse } from "react-icons/gi";
import { MdOutlinePool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin } from "react-icons/gi";
import { FaShopSlash } from "react-icons/fa6";
import { ListingDataContext } from '../context/ListingDataContext';

function ListingPage2() {
  const navigate = useNavigate();
  const {category, setCategory} = useContext(ListingDataContext);
  return (
    <div className='w-[100%] h-[100vh] flex items-center justify-center bg-white overflow-auto relative'>
        <div className='w-[50px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[5%]
        left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => navigate('/ListingPage1')}>
            <FaArrowLeftLong className='w-[25px] h-[25px] text-[white] '/>
        </div> 
        <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center
        rounded-[30px] absolute top-[5%] right-[10px] shadow-lg'>
            Set Your Category
        </div>
        <div className='max-w-[900px] w-[100%] h-[550px] overflow-auto bg-white flex items-center justify-start
        flex-col gap-[40px] mt-[30px]'>
        <h1 className='text-[black] text-[18px] md:text-[30px] px-[10px]'>Which of these best describes your place?</h1>
        <div className='max-w-[900px] w-[100%] md:w-[70%] h-[100%] flex flex-wrap items-center justify-center gap-[15px] '>
            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] 
            hover:border-[#a6a5a5] text-[16px] rounded-lg ${category === "villa" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("villa")}>
                <GiFamilyHouse className='w-[30px] h-[30px] text-[black]'/> <h3>Villa</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] 
            hover:border-[#a6a5a5] text-[16px] rounded-lg ${category === "farmHouse" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("farmHouse")}>
                <GiVikingLonghouse className='w-[30px] h-[30px] text-[black]'/> <h3>Farm House</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] 
            hover:border-[#a6a5a5] text-[16px] rounded-lg ${category === "poolHouse" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("poolHouse")}>
                <MdOutlinePool className='w-[30px] h-[30px] text-[black]'/> <h3>Pool House</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] 
            hover:border-[#a6a5a5] text-[16px] rounded-lg ${category === "bedroom" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("bedroom")}>
                <MdBedroomParent className='w-[30px] h-[30px] text-[black]'/> <h3>Bedroom</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px]
            hover:border-[#a6a5a5] text-[16px] rounded-lg ${category === "bedroom" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("bedroom")}>
                <MdBedroomParent className='w-[30px] h-[30px] text-[black]'/> <h3>Bedroom</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] 
            hover:border-[#a6a5a5] text-[16px] rounded-lg ${category === "flat" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("flat")}>
                <TbBuildingSkyscraper className='w-[30px] h-[30px] text-[black]'/> <h3>Flat</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] 
            hover:border-[#a6a5a5] text-[16px] rounded-lg ${category === "pg" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("pg")}>
                <IoBedOutline className='w-[30px] h-[30px] text-[black]'/> <h3>Pg</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] 
            hover:border-[#a6a5a5] text-[16px] rounded-lg ${category === "cabin" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("cabin")}>
                <GiWoodCabin className='w-[30px] h-[30px] text-[black]'/> <h3>Cabin</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] 
            hover:border-[#a6a5a5] text-[16px] rounded-lg ${category === "shops" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("shops")}>
                < FaShopSlash className='w-[30px] h-[30px] text-[black]'/> <h3>Shops</h3>
            </div>

        </div>
        <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg absolute
        right-[5%] bottom-[5%]' onClick={()=>navigate("/listingPage3")} disabled={!category}>Next</button>
        </div>
    </div>
  )
}

export default ListingPage2