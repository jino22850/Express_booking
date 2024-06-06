const express=require('express');

const mongoose =require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


// Initialize Express app
const app = express()
require("dotenv").config();


const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());




// Connect to MongoDB
const URL = process.env.MONGODB_URL;


mongoose.connect(URL,{
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
});

const connection = mongoose.connection;
connection.on("error",console.error.bind(console,"MongoDB connection error"))
connection.once('open',()=>{
    console.log("Mongodb connection success");

});

// Routes
const busRouter = require('./routes/bus');
app.use('/api', busRouter); 
const userRouter = require('./routes/users');
app.use('/api', userRouter); 
const conductorRouter = require('./routes/conductor');
app.use('/api/conductor', conductorRouter); 
const feedbackRoutes = require('./routes/feedback');
app.use('/api/feedback', feedbackRoutes);
const adminRouter = require('./routes/admin');
app.use('/api', adminRouter); 
const adminLoginroute = require ('./routes/login');
app.use('/api/admin',adminLoginroute)
const seatRoutes = require('./routes/seat');
app.use('/api', seatRoutes);
const reportRouter= require('./routes/report')
app.use('/api', reportRouter);
const authRoutes = require('./routes/authRouter');
app.use('/api/auth', authRoutes);


// Start the server
app.listen(PORT , ()=>{
    console.log(`server is up and running on port number: ${PORT}`);
});


