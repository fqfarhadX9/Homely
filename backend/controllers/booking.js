const Booking = require("../model/booking");
const Listing = require("../model/listing");
const User = require("../model/user");

const createBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, totalRent } = req.body;

    const listing = await Listing.findById(id);
    if (!listing)
      return res.status(404).json({ message: "Listing not found" });

    if (checkIn >= checkOut)
      return res.status(400).json({ message: "Invalid dates" });

    if (listing.isBooked)
      return res.status(400).json({ message: "Listing already booked" });

    const booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      listing: listing._id,
      host: listing.host,
      guest: req.user._id,
    });

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { booking: booking._id } }
    );

    listing.isBooked = true;
    listing.guest = req.user._id;
    await listing.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: `Create booking error: ${error.message}`,
    });
  }
};


const getMyBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ guest: req.user._id })
      .sort({ updatedAt: -1 })
      .populate("guest", "email")
      .populate("listing");

    if (!booking)
      return res.status(404).json({ message: "No booking found" });

    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    await Listing.findByIdAndUpdate(booking.listing, {
      isBooked: false,
      guest: null,
    });

    await User.findByIdAndUpdate(
      booking.guest,
      { $pull: { booking: booking._id } }
    );

    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `Cancel booking error: ${error.message}`,
    });
  }
};


const rateBooking = async (req, res) => {
  try {
    const { rating } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { guest: req.user._id },
      { rating },
      { new: true } 
    )
      .populate("guest", "email")
      .populate("listing");

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createBooking,
  getMyBooking,
  cancelBooking,
  rateBooking,
};
