import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
// import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingsRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import { stripeWebhooks } from './controllers/stripeWebhooks.js';

connectDB()
connectCloudinary();

const app = express();
app.use(cors()); // Enable CORS for all routes

// Api to listen to stripe Webhooks
app.post('/api/stripe', express.raw({type: "application/json"}), stripeWebhooks)

// Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to clerk webhooks
app.use("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);

app.get('/', (req, res) => res.send("API is working FINE"))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
// app.use('/api/rooms', roomRouter )
app.use('/api/bookings', bookingRouter )
// app.get('/', (req, res) => res.send("API is working fine"))
app.use('/api/rooms', roomRoutes);

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
