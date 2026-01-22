import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { UserDataContext } from './context/UserDataContext'
import MyListing from './pages/MyListing'
import ViewCard from './pages/ViewCard'
import MyBooking from './pages/MyBooking'
import BookingDetails from './pages/BookingDetails'

function App() {
  const {userData} = useContext(UserDataContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listingpage1" element={userData ? <ListingPage1 /> : <Login />} />
        <Route path="/listingpage2" element={userData ? <ListingPage2 /> : <Login />} />
        <Route path="/listingpage3" element={userData ? <ListingPage3 /> : <Login />} />
        <Route path="/mylisting" element={userData ? <MyListing /> : <Login />} />
        <Route path="/viewcard" element={userData ? <ViewCard /> : <Login />} />
        <Route path="/mybooking" element={userData ? <MyBooking /> : <Home />} />
         <Route
  path="/booked/:id"
  element={userData ? <BookingDetails /> : <Home />}
/>

      </Routes>
    </div>
  )
}

export default App