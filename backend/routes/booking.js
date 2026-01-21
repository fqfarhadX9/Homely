const express = require('express');
const isAuth = require('../middleware/isAuth.js');
const { createBooking } = require('../controllers/booking.js');

const bookingRouter = express.Router();

bookingRouter.post('/create/:id', isAuth, createBooking);

module.exports = bookingRouter;