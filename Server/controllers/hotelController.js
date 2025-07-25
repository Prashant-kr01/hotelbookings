import Hotel from "../models/hotel.js";
import User from "../models/user.js";

export const registerHotel = async(req, res)=>{
    try {
        const{name, address, contact, city} =req.body;
        const owner = req.user._id

        if (!owner) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        // check if the user is already registered
       const hotel = await Hotel.findOne({owner})
       if(hotel){
        return res.json({success: true, message: "Hotel Already registered" })

       }
       await Hotel.create({name, address, contact, city, owner});

       await User.findByIdAndUpdate(owner,{role: "hotelOwner"});

       res.json({success: true, message : "Hotel Registered SuccessFully"})

    } catch (error) {
        res.json({success: false, message : error.message})
    }
}
