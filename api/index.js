import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from '../auth/googleAuth.js';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from '../config/db.js';
import hostRoute from '../routes/hostRoute.js';
import cookieParser from "cookie-parser";
import authRoute from "../routes/authRoute.js"
import session from "express-session";


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(
    session({
        secret : process.env.GOOGLE_CLIENT_SECRET,
        resave : false,
        saveUninitialized : true
    })
);
app.use(passport.initialize());
app.use(passport.session());


// Middleware
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use('/api',hostRoute) // for signup;
app.use(authRoute);

app.use(morgan("dev")); // Specify format
app.use(helmet({ crossOriginResourcePolicy: false }));

const PORT = process.env.PORT || 4000;

// Health Check Route
app.get('/', (req, res) => {
    res.send(`Server is running on port ${PORT}`);
});


connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})




