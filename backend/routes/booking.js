const express = require('express');
const isAuth = require('../middleware/isAuth.js');
const { createBooking, cancelBooking,  } = require('../controllers/booking.js');

const bookingRouter = express.Router();

bookingRouter.post('/create/:id', isAuth, createBooking);
bookingRouter.delete('/cancel/:id', isAuth, cancelBooking);
// bookingRouter.post("/rate", isAuth, rateBooking);
// bookingRouter.get("/booked", isAuth, getMyBooking);


module.exports = bookingRouter;