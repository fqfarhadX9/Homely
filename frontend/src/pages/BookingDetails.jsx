import { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BookingDataContext } from "../context/BookingDataContext";
import { FaStar } from "react-icons/fa";
import Star from "../components/Star";
import { AuthDataContext } from "../context/AuthDataContext";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";
import { ListingDataContext } from "../context/ListingDataContext";
import { toast } from "react-toastify";

const BookingDetails = () => {
  const { bookingData } = useContext(BookingDataContext);
  const navigate = useNavigate();
  const [star, setStar] = useState(null);
  const {serverUrl} = useContext(AuthDataContext);
  const {fetchCurrentUser} = useContext(UserDataContext);
  const {getListings} = useContext(ListingDataContext);
  const {cardDetails} = useContext(ListingDataContext);

  const handleStar = (value) => {
    setStar(value);
    console.log("you rated", value);
  }

  const handleRating = async (id) => {
    try {
      const response  = await axios.post(serverUrl + `/api/listing/ratings/${id}`, 
        { ratings: star },
        { withCredentials: true }
      );
      console.log("Rating submitted:", response.data);
      await fetchCurrentUser();
      await getListings();
      toast.success("Rating Submitted");
      setTimeout(() => {
          navigate("/");
        }, 800);
    } catch (error) {
      console.log("Rating submission failed:", error);
      toast.error(error.response?.data?.message || "Rating Submission Failed");
    }
  }
  return (
    <div className="max-w-[900px] mx-auto mt-10 flex flex-col gap-6 px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 active:bg-red-700 w-fit"
      >
        <FaArrowLeft />
        Back
      </button>

      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Booking Details
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* IMAGE + TITLE */}
          <div className="md:w-[240px] w-full order-1 md:order-2">
            <img
              src={bookingData.listing?.image1}
              alt="listing"
              className="w-full h-[160px] object-cover rounded-lg"
            />
            <p className="mt-2 text-sm font-semibold text-gray-700">
              {bookingData.listing?.title}
            </p>
          </div>

          {/* BOOKING INFO */}
          <div className="flex-1 order-2 md:order-1">
            <p><b>Booking Id:</b> {bookingData._id}</p>
            <p><b>Your Email:</b> {bookingData.guest?.email}</p>
            <p><b>Check-In:</b> {new Date(bookingData.checkIn).toLocaleDateString()}</p>
            <p><b>Check-Out:</b> {new Date(bookingData.checkOut).toLocaleDateString()}</p>
            <p>
              <b>Total Rent:</b> ₹{Math.floor(bookingData.totalRent)}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span className="text-green-600 font-semibold">Booked</span>
            </p>
            <p className="mt-2">
              <b>Meet Your Host:</b> {bookingData.host?.email}
            </p>
          </div>

        </div>
      </div>

      <div className="w-[95%] max:w-[600px] h-[200px] bg-[white] flex items-center justify-center border-[1px] border-[#b5b5b5]
      flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg">
        <h1 className="text-[18px]">{star} out of 5 ratings</h1>
        <Star onRate={handleStar}/>
        <button className='px-[30px] md:px-[100px] py-[10px]  bg-red-500 text-white text-[18px] rounded-lg text-nowrap font-sembold'
        onClick={() => handleRating(cardDetails._id)}>Submit</button>
      </div>
    </div>
  );
};

export default BookingDetails;
