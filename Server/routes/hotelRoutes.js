import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";
import Hotel from "../models/hotel.js";

const hotelRouter = express.Router();

// In your hotelRoutes.js
hotelRouter.get('/my-hotel', protect, async (req, res) => {
  const hotel = await Hotel.findOne({ owner: req.user._id });
  if (hotel) {
    res.json({ success: true, hotel });
  } else {
    res.json({ success: false });
  }
});

hotelRouter.post('/', protect, registerHotel);

export default hotelRouter;