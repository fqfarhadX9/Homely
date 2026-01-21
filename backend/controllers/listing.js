const uploadOnCloudinary = require("../config/cloudinary");
const Listing = require("../model/listing");
const User = require("../model/user");

const addListing = async (req, res) => {
  try {
    const host = req.user._id;
    const { title, description, rent, city,  landmark, category } = req.body;
    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);
    const listing =  await Listing.create({
        title,
        description,
        rent,
        city,
        landmark,
        category,
        image1,
        image2,
        image3,
        host
    });
    
    let user = await User.findByIdAndUpdate(host, {$push: { listing: listing._id } }, { new: true });
    if(!user) {
        return res.status(404).json({ message: "User not found to add listing" });
    }

    return res.status(201).json({
      message: "Listing added successfully",
      listing
    });
  } catch (error) {
    return res.status(500).json({
      message :`Addlisting error: ${error.message}` 
    });
  }
};

const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Listings fetched successfully",
      listings
    });
  } catch (error) {
    return res.status(500).json({
      message: `Get listings error: ${error.message}`
    });
  } 
};

const findListingById = async (req, res) => {
  try {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    return res.status(200).json({
      message: "Listing fetched successfully",
      listing
    });
  } catch (error) {
    return res.status(500).json({
      message: `Find listing by id error: ${error.message}`
    });
  }
};

const updateListing = async (req, res) => {
  try {
    const {id} = req.params;
    let image1, image2, image3;
    const { title, description, rent, city,  landmark, category } = req.body;
    if(req.files.image1) {
      image1 = await uploadOnCloudinary(req.files.image1[0].path);
    }
    if(req.files.image2) {
       image2 = await uploadOnCloudinary(req.files.image2[0].path)
    }
    if(req.files.image3) {
      image3 = await uploadOnCloudinary(req.files.image3[0].path);
    }
    const listing =  await Listing.findByIdAndUpdate(id,{
        title,
        description,
        rent,
        city,
        landmark,
        category,
        image1,
        image2,
        image3,
    }, { new: true });

    return res.status(201).json({
      message: "Listing added successfully",
      listing
    });

  } catch (error) {
    return res.status(500).json({
      message :`Addlisting error: ${error.message}` 
    });
  }
}

const deleteListing = async (req, res) => {
  try {
    const {id} = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    
    const user = await User.findByIdAndUpdate(listing.host, { $pull: { listing: listing._id } }, { new: true });
    if(!user) {
      return res.status(404).json({ message: "User not found to delete listing" });
    }
    return res.status(200).json({
      message: "Listing deleted successfully",
      listing
    });
  } catch (error) {
    return res.status(500).json({
      message: `Delete listing error: ${error.message}`
    });
  }
}

module.exports = {
  addListing,
  getListings,
  findListingById,
  updateListing,
  deleteListing
}