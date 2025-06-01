import user from '../models/User.js';
import { Webhook } from 'svix';

const clerkWebhooks = async (req , res) =>{
    try{
        // Create a Svix instance with clerk webhook secret
         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
       //    getting headers
         const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"],  
         } ;

        //  verify headers
        // await whook.verify(JSON.stringify(req.body), headers)

        // Getting Data from request body
        // const {data, type} = req.body

//--------------------- code changed from here ---------------------

            // Use raw body for verification
        const payload = req.body.toString();
        const evt = whook.verify(payload, headers);

        const {data, type} = evt;

    

        // switch case for different Events

        switch(type){
            case "user.created":{
                  const userData ={
                       _id: data.id,
                        email: data.email_addresses[0].email_address,
                        username: data.first_name + " " + data.last_name,
                       image: data.image_url,
                      }
                await User.create(userData);
                break;
            }

            case "user.updated":{
                    const userData ={
                       _id: data.id,
                        email: data.email_addresses[0].email_address,
                        username: data.first_name + " " + data.last_name,
                       image: data.image_url,
                      }
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                break;
        }
        res.json({sucess: true, message : "Webhook Recieved"})

    }catch(error){
           console.log(error.message);
           res.json({sucess: false, message : error.message});
    }
}

export default clerkWebhooks;
