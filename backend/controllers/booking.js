const Booking = require("../model/booking");
const Listing = require("../model/listing");
const User = require("../model/user");

const createBooking = async (req, res) => {
  try {
    const {id} = req.params;
    const { checkIn, checkOut, totalRent } = req.body;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (checkIn >= checkOut) { 
        return res.status(400).json({ message: "Invalid checkIn/checkOut dates" });
    }
    if (listing.isBooked) {
        return res.status(400).json({ message: "Listing is already booked" });
    }
    const booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      listing: listing._id,
      host: listing.host,
      guest: req.user._id,
    });
    const user = await User.findByIdAndUpdate(req.user._id, { $push: { booking: booking._id } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found to add booking" });
    }
    listing.isBooked = true;
    listing.guest = req.user._id;
    await listing.save();
    return res.status(201).json({
      message: "Booking created successfully",
      booking
    });
  } catch (error) {
    return res.status(500).json({
      message: `Create booking error: ${error.message}`
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params; // bookingId

    // 1️⃣ find booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 2️⃣ free listing
    await Listing.findByIdAndUpdate(booking.listing, {
      isBooked: false,
      guest: null
    });

    // 3️⃣ remove booking from user
    await User.findByIdAndUpdate(
      booking.guest,
      { $pull: { booking: booking._id } }
    );

    // 4️⃣ delete booking
    await Booking.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Booking cancelled successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: `Cancel booking error: ${error.message}`
    });
  }
};

const rateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rating } = req.body;
    if (rating < 1 || rating > 5) {
       return res.status(400).json({ message: "Invalid rating" });
    }


    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // only guest can rate
    if (booking.guest.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    booking.rating = rating;
    await booking.save();

    return res.status(200).json({
      message: "Rating added successfully",
      booking
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createBooking,
  cancelBooking,
  rateBooking
};