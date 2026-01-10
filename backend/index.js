const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const listingRouter = require('./routes/listing.js');
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter)

app.listen(port, () => {
    connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});