const User = require("../model/user.js");

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password").populate("listing", "title image1 image2 image3 description rent category city landmark ratings isBooked host")
    .populate({
    path: "booking",
    populate: {
      path: "listing",
      select: "title image1 image2 image3 city rent landmark ratings host"
    }
  });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { getCurrentUser };
