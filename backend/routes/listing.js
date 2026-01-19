const express = require('express');
const listingRouter = express.Router();
const isAuth = require('../middleware/isAuth.js');
const upload = require('../middleware/multer.js');
const { addListing, getListings, findListingById } = require('../controllers/listing.js');

listingRouter.post('/add', isAuth, upload.fields(
    [{ name: 'image1', maxCount: 1 },
     { name: 'image2', maxCount: 1 },
     { name: 'image3', maxCount: 1 }]), addListing);
listingRouter.get("/get", getListings);
listingRouter.get("/findlistingbyid/:id", isAuth, findListingById);

module.exports = listingRouter;    