import { updateSubscriptionForCustomer } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server"

// export const config = {  api: {    bodyParser: false,  },};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export async function POST(req: NextRequest, res: NextResponse) {
    // Check if webhook signing is configured.
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
    let event;
    let signature = req.headers.get("stripe-signature");

    const bodyJson = await req.text()

    try {
        event = stripe.webhooks.constructEvent(
            bodyJson,
            signature,
            webhookSecret
        );
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        console.log({ error: err });
        return NextResponse.json({ error: err }, { status: 400 })
    }
    // Extract the object from the event.
    const data = event.data
    const eventType = event.type

    console.log(data)

    const customerId = data.object.customer

    switch (eventType) {
        case 'checkout.session.completed':
            // Payment is successful and the subscription is created.
            // You should provision the subscription and save the customer ID to your database.
            break;
        case 'invoice.paid':
            // Continue to provision the subscription as payments continue to be made.
            // Store the status in your database and check when a user accesses your service.
            // This approach helps you avoid hitting rate limits.
            try {
                updateSubscriptionForCustomer(customerId)
            } catch (error) {
                console.error({ message: "error during save updating payment details for customerId", customerId, error })
            }
            break;
        case 'invoice.payment_failed':
            // The payment failed or the customer does not have a valid payment method.
            // The subscription becomes past_due. Notify your customer and send them to the
            // customer portal to update their payment information.
            break;
        default:
        // Unhandled event type
    }

    return NextResponse.json("ok")
}