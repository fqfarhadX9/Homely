import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong, FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from '../context/ListingDataContext';
import { UserDataContext } from '../context/UserDataContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { AuthDataContext } from '../context/AuthDataContext';
import { BookingDataContext } from '../context/BookingDataContext';

function ViewCard() {
    const navigate = useNavigate();
    const {cardDetails} = useContext(ListingDataContext);
    const {userData} = useContext(UserDataContext);
    const [updatePoppup, setUpdatePoppup] = useState(false);
    const [bookingPoppup, setBookingPoppup] = useState(false);
    const [title, setTitle] = useState(cardDetails?.title || "");
    const [description, setDescription] = useState(cardDetails?.description || "");
    const [rent, setRent] = useState(cardDetails?.rent);
    const [city, setCity] = useState(cardDetails?.city || "");
    const [landmark, setLandmark] = useState(cardDetails?.landmark || "");
    const [backendImage1, setBackendImage1] = useState(null);
    const [backendImage2, setBackendImage2] = useState(null);
    const [backendImage3, setBackendImage3] = useState(null);
    const {serverUrl} = useContext(AuthDataContext);
    const {updating, setUpdating} = useContext(ListingDataContext);
    const {deleteting, setDeleting} = useContext(ListingDataContext);
    const [minDate, setMinDate] = useState("");

    const {checkIn, setCheckIn, checkOut, setCheckOut, total, setTotal, nights, setNights, bookingData, setBookingData,
        handleBooking, booking} = useContext(BookingDataContext);

    useEffect(() => {
      if(checkIn && checkOut) {
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        let n = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
        setNights(n);
        const platformCharges = (cardDetails.rent * (7/100));
        const tax = (cardDetails.rent * (5/100));
        const total = (cardDetails.rent * n) + platformCharges + tax;
        setTotal(total);
      } else {
        setTotal(0);
      }
    }, [checkIn, checkOut,]);


    const handleUpdateListing = async () => {
       setUpdating(true);
       try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("rent", rent);
        formData.append("city", city);
        formData.append("landmark", landmark);
        if(backendImage1) {formData.append("image1", backendImage1)};
        if(backendImage2) {formData.append("image2", backendImage2)};
        if(backendImage3) {formData.append("image3", backendImage3)};

        const response = await axios.post(`${serverUrl}/api/listing/update/${cardDetails._id}`, formData,
            {withCredentials: true,});
        console.log("Listing updated:", response.data);
        navigate('/');
        setTitle("");
        setDescription("");
        setRent("");
        setCity("");
        setLandmark("");
        setBackendImage1(null);
        setBackendImage2(null);
        setBackendImage3(null);
        setUpdating(false);
      } catch (error) {
        setUpdating(false);
        console.error("Error updating listing:", error);
      }
    }

    const handleImage1 = (e) => {
        const file = e.target.files[0];
        setBackendImage1(file);
    }
    const handleImage2 = (e) => {
        const file = e.target.files[0];
        setBackendImage2(file);
    }
    const handleImage3 = (e) => {
      const file = e.target.files[0];
      setBackendImage3(file);
    }

    const handleDeleteListing = async () => {
        setDeleting(true);
        try {
            const response = await axios.delete(`${serverUrl}/api/listing/delete/${cardDetails._id}`, {withCredentials: true});
            console.log("Listing deleted:", response.data);
            navigate('/');
            setDeleting(false);
        } catch (error) {
            setDeleting(false);
           console.error("Error deleting listing:", error);
        }
    }

    useEffect(() => {
      const today = new Date().toISOString().split('T')[0];
      setMinDate(today);
    } , []);
      

  return (
    <div className='w-[100%] h-[100vh] flex items-center justify-center bg-[white] gap-[10px] flex-col 
        overflow-auto relative'>
          <div className='w-[50px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[5%]
          left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => navigate('/')}>
              <FaArrowLeftLong className='w-[25px] h-[25px] text-[white] '/>
          </div> 
    
          <div className='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]'>
            <h1 className='text-[20px] md:text-[30px] text-[#272727] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]'>
              {`In ${cardDetails?.landmark.toUpperCase()} , ${cardDetails?.city.toUpperCase()}`}  
            </h1>
          </div>
    
          <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
            <div className='w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center
            border-[2px] border-[white]'>
              <img src={cardDetails?.image1} alt="image1" className='w-[100%]'/>
            </div>
    
            <div className='w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col'>
              <div className='w-[100%] h-[100%] flex items-center justify-center overflow-hidden border-[2px] border-[white] '>
                <img src={cardDetails?.image2} alt="image2" className='w-[100%]' />
              </div>
              <div className='w-[100%] h-[100%] flex items-center justify-center overflow-hidden border-[2px] border-[white] '>
                <img src={cardDetails?.image3} alt="image2" className='w-[100%]' />
              </div>
            </div>
          </div>
          <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
              {`${cardDetails?.title.toUpperCase()} ${cardDetails?.category.toUpperCase()} , ${cardDetails?.landmark.toUpperCase()}`}
          </div>
          <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800'>
              {`${cardDetails?.description.toUpperCase()}`}
            </div>
            <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
              {`Rs.${cardDetails?.rent}/day `}
            </div>
            <div className='w-[95%] h-[50px] flex items-center justify-start px-[40px]'>
                {cardDetails?.host === userData?.user?._id ? (
                   <button className='px-[30px] py-[10px] mx-[75px] bg-[red] text-white text-[18px] md:px-[100px] rounded-lg text-nowrap' onClick={()=>setUpdatePoppup(prev => !prev)}>
                     Edit Listing
                    </button>
                ) : (
                   <button className='px-[30px] py-[10px] mx-[75px] bg-[red] text-white text-[18px] md:px-[100px] rounded-lg text-nowrap'  onClick={()=>setBookingPoppup(prev => !prev)}>
                    Reserve
                   </button>
                )}
            </div>

            {updatePoppup && <div className='w-[100%] h-[100%] flex items-center justify-center bg-[#000000c6] absolute top-[0px] z-[100]'>
              <RxCross2 className='w-[50px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[5%]
          left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => setUpdatePoppup(false)}/>

          <form action="" className='max-w-[900px] w-[90%] h-[550px] flex  items-center justify-start flex-col 
                  gap-[10px] overflow-auto mt-[50px] text-white bg-[#272727] p-[20px] rounded-lg' onSubmit={(e) => e.preventDefault()}>
                      <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center
                      rounded-[30px] absolute top-[5%] right-[10px] shadow-lg'>Update Your Listing</div>
                      <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                        <label htmlFor="title" className='text-[20px]'>Title</label>
                        <input type="text" id="title" className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px]
                         px-[20px] text-black' required onChange={(e) => setTitle(e.target.value)} value={title}/>
                      </div>
          
                      <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                        <label htmlFor="des" className='text-[20px]'>Description</label>
                        <textarea name='' id="des" className='w-[90%] h-[80px] border-[2px] border-[#555656] rounded-lg text-[18px] 
                        px-[20px] text-black' required onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                      </div>
          
                      <div className='w-[90%] flex items-start justify-center flex-col gap-[10px]'>
                        <label htmlFor="image1" className='text-[20px]'>Image1</label>
                       <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px] '>
                         <input type="file" id="image1" className='w-[100%] text-[15px] px-[10px]' onChange={handleImage1}/>
                       </div>
                      </div>
          
                      <div className='w-[90%] flex items-start justify-center flex-col gap-[10px]'>
                        <label htmlFor="image2" className='text-[20px]'>Image2</label>
                       <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px] '>
                         <input type="file" id="image2" className='w-[100%] text-[15px] px-[10px]' onChange={handleImage2}/>
                       </div>
                      </div>
          
                      <div className='w-[90%] flex items-start justify-center flex-col gap-[10px]'>
                        <label htmlFor="image3" className='text-[20px]'>Image3</label>
                       <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px] '>
                         <input type="file" id="image3" className='w-[100%] text-[15px] px-[10px]' onChange={handleImage3}/>
                       </div>
                      </div>
          
                      <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                        <label htmlFor="rent" className='text-[20px]'>Rent</label>
                        <input type="number" id="rent" className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px]
                         px-[20px] text-black' required onChange={(e) => setRent(e.target.value)} value={rent}/>
                      </div>
          
                      <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                        <label htmlFor="city" className='text-[20px]'>City</label>
                        <input type="text" id="city" className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px]
                         px-[20px] text-black' required onChange={(e) => setCity(e.target.value)} value={city}/>
                      </div>
          
                      <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                        <label htmlFor="landmark" className='text-[20px]'>Landmark</label>
                        <input type="text" id="landmark" className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px]
                         px-[20px] text-black' required onChange={(e) => setLandmark(e.target.value)} value={landmark}/>
                      </div>
          
                      <div className='w-[100%] flex items-center justify-center gap-[30px] mt-[20px]'>
                        <button className='px-[10px] py-[10px] bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg md:text-[18px] text-nowrap' 
                        onClick={handleUpdateListing}>{updating ? "Updating..." : "Update Listing"}</button>

                        <button className='px-[10px] py-[10px] bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg md:text-[18px] text-nowrap' 
                        onClick={handleDeleteListing} disabled={deleteting}>{deleteting ? "Deleting..." : "Delete Listing"}</button>
                      </div>
                  </form>
            </div>}

            {bookingPoppup && <div className='w-[100%] min-h-[100%] flex items-center justify-center flex-col gap-[30px] bg-[#ffffffcd] absolute top-[0px] 
            z-[100] p-[20px] backdrop-blur-sm md:flex-row md:gap-[100px]'>
               <RxCross2 className='w-[50px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[5%]
               left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => setBookingPoppup(false)}/>
               <form action="" className='max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f3f1f1] p-[20px] rounded-lg flex items-center justify-start
               flex-col gap-[10px] border-[1px] border-[#dedddd]' onSubmit={(e) => e.preventDefault()}>
                <h1 className='w-[100%] flex items-center justify-center py-[10px] text-[25px] border-b-[1px] border-[#a3a3a3]'>Confirm & Book</h1>
                <div className='w-[100%] h-[70%] mt-[10px] rounded-lg p-[10px]'>
                  <h3 className='text-[19px] font-semibold'>Your Trip</h3>
                  <div className='w-[90%] flex items-center justify-start gap-[10px] mt-[20px] md:justify-center flex-col md:flex-row md:items-start'>
                        <label htmlFor="checkin" className='text-[20px]'>CheckIn</label>
                        <input type="date" id="checkin" min={minDate} className='w-[200px] h-[40px] border-[2px] border-[#555656] rounded-[10px] bg-transparent 
                        text-[15px] md:text-[18px] px-[10px] px-[20px] text-black' onChange={(e) => setCheckIn(e.target.value)} value={checkIn}/>
                  </div>
                  <div className='w-[90%] flex items-center justify-start gap-[10px] mt-[40px] md:justify-center flex-col md:flex-row md:items-start'>
                        <label htmlFor="checkout" className='text-[20px]'>CheckOut</label>
                        <input type="date" id="checkout" min={minDate} className='w-[200px] h-[40px] border-[2px] border-[#555656] rounded-[10px] bg-transparent 
                        text-[15px] md:text-[18px] px-[10px] px-[20px] text-black' onChange={(e) => setCheckOut(e.target.value)} value={checkOut}/>
                  </div>
                  <div className='w-[100%] flex items-center justify-center'>
                     <button className='px-[80px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg md:text-[18px] text-nowrap mt-[30px]' onClick={() =>handleBooking(cardDetails._id)} disabled={booking}>{booking ? "Booking..." : "Book Now"}</button>
                  </div>
                </div>
               </form>

               <div className='max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f3f1f1] p-[20px] rounded-lg flex items-center justify-start
               flex-col gap-[10px] border-[1px] border-[#dedddd]'>
                <div className='w-[95%] h-[30%] border-[1px] border-[#9b9a9a] rounded-lg flex items-center justify-center p-[20px] gap-[8px] overflow-hidden'>
                  <div className='w-[70px] h-[80px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px] md:h-[100px]'>
                    <img src={cardDetails.image1} alt="" className='w-[100%] h-[100%]'/>
                  </div>
                  <div className='w-[80%] h-[100px] gap-[5px]'>
                    <h1 className='w-[90%] truncate'>{`In ${cardDetails.landmark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}</h1>
                    <h1>{cardDetails.title.toUpperCase()}</h1>
                    <h1>{cardDetails.category.toUpperCase()}</h1>
                    <h1 className='flex items-center justify-start gap-[5px]'>
                      <FaStar className='text-[#eb6262] ' />{cardDetails.ratings}
                    </h1>
                  </div>
                </div>

                <div className='w-[95%] h-[60%] border-[1px] border-[#9b9a9a] rounded-lg flex justify-start items-start p-[20px] gap-[15px] flex-col'>
                  <h1 className='text-[22px] font-semibold'>Trip Details</h1>
                  <p className='w-[100%] flex items-center justify-between px-[20px]'>
                    <span className='font-semibold'>{`₹${cardDetails.rent} X ${nights} nights`}</span>
                    <span>{cardDetails.rent * nights}</span>
                  </p>

                  <p className='w-[100%] flex items-center justify-between px-[20px]'>
                    <span className='font-semibold'>Homely Charges</span>
                    <span>{cardDetails.rent * (7)/100}</span>
                  </p>

                  <p className='w-[100%] flex items-center justify-between px-[20px] border-b-[1px] border-gray-500 pb-[10px]'>
                    <span className='font-semibold'>Tax</span>
                    <span>{cardDetails.rent * (5)/100}</span>
                  </p>

                  <p className='w-[100%] flex items-center justify-between px-[20px]'>
                    <span className='font-semibold'>Total Price</span>
                    <span>{total}</span>
                  </p>
                </div>
                </div>
            </div>}
        </div>
  )
}

export default ViewCard