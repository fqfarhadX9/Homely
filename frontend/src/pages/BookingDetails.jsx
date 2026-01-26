import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthDataContext";
import { UserDataContext } from "../context/UserDataContext";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const { serverUrl } = useContext(AuthDataContext);
  const { fetchCurrentUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch booking on load
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/booking/booked`, {
          withCredentials: true,
        });
        setBooking(res.data.booking);
        setRating(res.data.booking.rating || 0);
        setLoading(false);
      } catch (err) {
        console.log("Booking error:", err);
        setLoading(false);
      }
    };
    fetchBooking();
  }, [serverUrl]);

  // Submit rating
  const submitRating = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/booking/rate`,
        { rating },
        { withCredentials: true }
      );
      setBooking(res.data.booking);
      await fetchCurrentUser(); // update MyBooking page
      alert("Rating submitted successfully ⭐");
    } catch (err) {
      console.log(err);
      alert("Error submitting rating");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading booking...</p>;
  if (!booking) return <p className="text-center mt-10">No booking found</p>;

  return (
    <div className="max-w-[700px] mx-auto mt-10 flex flex-col gap-6 px-4">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 active:bg-red-700 w-fit"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Booking Info Card */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Booking Details
        </h2>
        <p><b>Email:</b> {booking.guest.email}</p>
        {booking.checkIn && booking.checkOut && (
          <p>
            <b>Check-In:</b> {new Date(booking.checkIn).toLocaleDateString()} &nbsp;
            <b>Check-Out:</b> {new Date(booking.checkOut).toLocaleDateString()}
          </p>
        )}
        <p><b>Total Rent:</b> ₹{booking.totalRent}</p>
        <p>
          <b>Status:</b>{" "}
          <span className="text-green-600 font-semibold">Booked</span>
        </p>
      </div>

      {/* Rating Card */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-2">Rate Your Stay</h3>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={28}
              className={`cursor-pointer transition-colors duration-200 ${
                star <= rating
                  ? "text-yellow-400 hover:text-yellow-500"
                  : "text-gray-300 hover:text-gray-400"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <button
          onClick={submitRating}
          disabled={booking.rating > 0}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors duration-200 ${
            booking.rating > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 active:bg-red-700"
          }`}
        >
          {booking.rating > 0 ? "Already Rated" : "Submit Rating"}
        </button>
      </div>

    </div>
  );
};

export default BookingDetails;
