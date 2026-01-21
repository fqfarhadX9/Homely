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

module.exports = {
  createBooking
};