import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import axios from "axios";

const BookingDetails = () => {
  const { id } = useParams(); // 👈 booking id from URL
  const [booking, setBooking] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `/api/booking/${id}`,
          { withCredentials: true }
        );
        setBooking(res.data.booking);
        setRating(res.data.booking.rating || 0);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking) return <p>Loading booking details...</p>;

  const submitRating = async () => {
    await axios.post(
      `/api/booking/rate/${booking._id}`,
      { rating },
      { withCredentials: true }
    );
    alert("Rating submitted!");
  };

  return (
    <div className="w-[90%] max-w-[600px] bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">Booking Details</h2>

      <p><b>User:</b> {booking.guest?.email}</p>
      <p><b>Total Price:</b> ₹{booking.totalRent}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Rate Your Stay</h3>
        <StarRating rating={rating} setRating={setRating} />
        <button
          onClick={submitRating}
          className="mt-3 px-6 py-2 bg-red-500 text-white rounded-lg"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;
