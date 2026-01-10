const {v2: cloudinary} = require('cloudinary');
const fs  = require('fs');

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if(!filePath) {
            return null;
        }
        const result = await cloudinary.uploader.upload(filePath);
        // Remove file from local uploads folder
        if (fs.existsSync(filePath)) {
           fs.unlinkSync(filePath);
        }
        return result.secure_url;
    } catch (error) {
        if (fs.existsSync(filePath)) {
           fs.unlinkSync(filePath);
        }
        console.log("Cloudinary Upload Error: ", error);
    }
}

module.exports = uploadOnCloudinary;