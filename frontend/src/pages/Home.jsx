import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { ListingDataContext } from '../context/ListingDataContext';
import { UserDataContext } from '../context/UserDataContext';
import Card from '../components/Card';

function Home() {
  const { newListingData } = useContext(ListingDataContext);
  const { userData } = useContext(UserDataContext);

  const [listings, setListings] = useState([]);

  useEffect(() => {
  if (!newListingData) return;
  const mergedListings = newListingData.map(list => {
    const booking = userData?.user?.booking?.find(b => b.listing === list._id);
    return {
      ...list,
      bookingRating: booking?.rating ?? list.ratings ?? 0,
      bookingId: booking?._id ?? null
    };
  });
  setListings(mergedListings);
}, [newListingData, userData?.user?.booking?.length]); 

if (!userData) {
  return <div>Loading...</div>
}

  return (
    <div>
      <Nav/>
      <div className='w-[100vw] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[280px] md:mt-[180px]'>
        {listings.map(list => (
          <Card
            key={list._id + list.bookingRating} // force re-render if rating changes
            title={list.title}
            landmark={list.landmark}
            city={list.city}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
            id={list._id}
            ratings={list.bookingRating}  // use merged booking rating
            isBooked={list.isBooked}
            host={list.host}
            bookingId={list.bookingId}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;
