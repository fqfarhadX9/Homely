const express = require('express');
const isAuth = require('../middleware/isAuth.js');
const { createBooking, cancelBooking, rateBooking } = require('../controllers/booking.js');
const Booking = require('../model/booking.js');

const bookingRouter = express.Router();

bookingRouter.post('/create/:id', isAuth, createBooking);
bookingRouter.delete('/cancel/:id', isAuth, cancelBooking);
// GET single booking by ID (for booking details page)
bookingRouter.get('/:id', isAuth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('guest', 'email')
      .populate('listing');

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = bookingRouter;