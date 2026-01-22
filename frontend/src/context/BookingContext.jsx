import React, { useContext, useState } from 'react'
import { BookingDataContext } from './BookingDataContext'
import axios from 'axios';
import { AuthDataContext } from './AuthDataContext';
import { UserDataContext } from './UserDataContext';
import { ListingDataContext } from './ListingDataContext';
import { useNavigate } from 'react-router-dom';

function BookingContext({children}) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [total, setTotal] = useState(0);
    const [nights, setNights] = useState(0);
    const {serverUrl} = useContext(AuthDataContext);
    const {fetchCurrentUser} = useContext(UserDataContext);
    const {getListings} = useContext(ListingDataContext);
    const [bookingData, setBookingData] = useState([]);
    const [booking, setBooking] = useState(false)
    const navigate = useNavigate();

    const handleBooking = async (id) => {
        try {
            setBooking(true);
            const result = await axios.post(serverUrl + `/api/booking/create/${id}`, {checkIn, checkOut, totalRent: total}, {withCredentials: true});
            await fetchCurrentUser();
            await getListings();
             console.log("Booking Successful:", result.data);
            setBookingData(result.data.booking);
            setBooking(false);
            navigate(`/booked/${result.data.booking._id}`);
        } catch (error) {
            console.log(error);
            setBookingData(null);
            setBooking(false);
        }
    }

    const cancelBooking = async (id) => {
        try {
            const result = await axios.delete(serverUrl + `/api/booking/cancel/${id}`, {withCredentials: true});
            await fetchCurrentUser();
            await getListings();
            console.log("Booking Cancelled:", result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        checkIn, setCheckIn, 
        checkOut, setCheckOut, 
        total, setTotal, 
        nights, setNights,
        bookingData, setBookingData,
        handleBooking, cancelBooking,
        booking, setBooking
    };
  return (
    <div>
        <BookingDataContext.Provider value={value}>
            {children}
        </BookingDataContext.Provider>
    </div>
  )
}

export default BookingContext