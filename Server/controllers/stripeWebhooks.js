import stripe from "stripe";
import Booking from "../models/booking.js";

// api to handle stripe webhooks

export const stripeWebhooks = async (request, response)=>{
    // stripe Gateway Initialize
    const stripeInstace = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstace.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
       return response.status(400).send(`webhooks Error: ${err.message}`)
    }

    // Handle the event
    // if(event.type === "payment_intent.succeeded"){
    //     const paymentIntent = event.data.object;
    //     const paymentIntentId = paymentIntent.id;

    // // Getting sessions Metadata
    // const session = await stripeInstace.checkout.sessions.list({
    //     payment_intent: paymentIntentId,
    // });

    // const { bookingId } = session.data[0].metadata;

    // // Mark payment as payed
    //  await Booking.findByIdAndUpdate(bookingId, {isPaid: true, paymentMethod: "Stripe"})
    // }else{
    //     console.log("Unhandled event type :", event.type)
    // }
    // response.json({recieved: true});
       if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const bookingId = session.metadata?.bookingId;

        if (bookingId) {
            // Mark payment as paid
            await Booking.findByIdAndUpdate(bookingId, { isPaid: true, paymentMethod: "Stripe" });
        }
    }else if (event.type === "payment_intent.succeeded") {
    // Optional: Handle this event if needed, but normally not required for Checkout
    console.log("Payment intent succeeded, but not updating booking here.");
} else {
        console.log("Unhandled event type :", event.type);
    }
    response.json({ received: true });
}