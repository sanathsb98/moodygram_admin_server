import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from '../config/db.js';
import hostRoute from '../routes/hostRoute.js';

dotenv.config();

const app = express();
app.use(express.json());

// Middleware
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use('/api',hostRoute) // for signup;

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




