/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawBody = await buffer(req);
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(400).send("Missing the stripe signature");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      try {
        const updateData: any = {
          status: "completed",
          deliveryStatus: "pending",
        };

        // Only update address if we have all required fields
        if (paymentIntent.shipping?.address) {
          const stripeAddr = paymentIntent.shipping.address;

          // Validate required fields exist
          const hasRequiredFields =
            stripeAddr.city &&
            stripeAddr.country &&
            stripeAddr.line1 &&
            stripeAddr.postal_code &&
            stripeAddr.state;

          if (hasRequiredFields) {
            updateData.address = {
              city: stripeAddr.city,
              country: stripeAddr.country,
              line1: stripeAddr.line1,
              line2: stripeAddr.line2, // Can be null
              postal_code: stripeAddr.postal_code,
              state: stripeAddr.state,
            };
            console.log("Address added to order update");
          } else {
            console.log(
              "Shipping address missing required fields, skipping address update",
            );
          }
        }
        console.log("Received payment intent ID:", paymentIntent.id);
        const order = await prisma?.order.update({
          where: {
            paymentIntentId: paymentIntent.id,
          },
          data: updateData,
        });
        console.log("Matching order:", order);
        console.log("Order updated successfully");
      } catch (error: any) {
        console.error("Error updating order:", error);
      }
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.json({ received: true });
}
