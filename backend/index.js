const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const listingRouter = require('./routes/listing.js');
const bookingRouter = require('./routes/booking.js');
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://homely-fkpn.onrender.com',
    credentials: true,
}))


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter)
app.use("/api/booking", bookingRouter);

app.listen(port, () => {
    connectDB();
  console.log(`Server is running on port ${port}`);
});