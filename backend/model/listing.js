const mongoose = require('mongoose');
const User = require('./user.js');

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image1: { type: String, required: true },
    image2: { type: String },
    image3: { type: String },
    rent: { type: Number, required: true, required: true },
    city: { type: String, required: true, required: true },
    landmark: { type: String, required: true },
    category: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
}, { timestamps: true });   

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;