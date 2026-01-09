const express = require('express');
const userRoute = express.Router();
const isAuth = require('../middleware/isAuth.js');
const { getCurrentUser } = require('../controllers/user.js');

userRoute.get('/currentuser', isAuth, getCurrentUser);

module.exports = userRoute;