import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataContext';
import { FaArrowLeftLong } from "react-icons/fa6";
import Card from '../components/Card';

function MyBooking() {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);


  const bookings = userData?.user?.booking || [];
  console.log("bookings: ", bookings);
  const userdata = userData?.user;
  console.log("userdata", userdata);

  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative px-[20px]'>

      <div
        className='w-[50px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center'
        onClick={() => navigate('/')}
      >
        <FaArrowLeftLong className='w-[25px] h-[25px] text-white' />
      </div>

      <div className='w-[60%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center
        text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] md:w-[600px] text-nowrap'>
        My Booking
      </div>

      <div className='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]'>
          {bookings.map((book) => (
  <Card
  key={book._id }
  bookingId={book._id}
  title={book.listing?.title}
  landmark={book.listing?.landmark}
  city={book.listing?.city}
  image1={book.listing?.image1}
  image2={book.listing?.image2}
  image3={book.listing?.image3}
  rent={book.listing?.rent}
  ratings={book.listing?.ratings}
  host={book.listing?.host}
  isBooked={true}
/>

))}

      </div>
    </div>
  );
}

export default MyBooking;
