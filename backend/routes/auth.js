const express = require('express');
const {Signup, Signin} = require('../controllers/auth.js');

const authRouter = express.Router();

authRouter.post('/signup', Signup);
authRouter.post('/signin', Signin);
// authRouter.post('/logout', Logout)

module.exports = authRouter;