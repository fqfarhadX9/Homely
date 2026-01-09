const jwt  = require('jsonwebtoken');
const User = require('../model/user');

const verifyJWT = async (req, res, next) => {
     try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
        
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user =await User.findById(decodedToken.userId).select("-refreshToken -password")

         if (!user) {
             return res.status(401).json({ message: 'Invalid access token' });
        }

        req.user = user
        next()
     } catch (error) {
        console.log("authorization error");
        return res.status(401).json({ message: error?.message || 'Invalid authentication token' });
     }
}
module.exports = verifyJWT




// const isAuth = (req, res, next) => {
//     const token = req.cookies.token;
    
//     // const token = req.headers.authorization?.split(" ")[1];

//     console.log("Token:", token, typeof token);


//     if (!token) {
//         return res.status(401).json({ message: 'Authentication token missing' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (!decoded) {
//             return res.status(401).json({ message: 'user does not have token' });
//         }
//         req.userId = decoded.userId; 
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: 'Invalid authentication token' });
//     }   
// };

// module.exports = isAuth;
