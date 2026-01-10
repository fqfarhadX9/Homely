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

module.exports = {
  addListing,
};