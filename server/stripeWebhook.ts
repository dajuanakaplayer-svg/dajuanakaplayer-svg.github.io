import { Express, Request, Response } from "express";
import Stripe from "stripe";
import * as db from "./db";
import * as paymentDb from "./paymentDb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export function setupStripeWebhook(app: Express) {
  // CRITICAL: Register webhook route with raw body parser BEFORE express.json()
  // This must be done in the main server file before other middleware
  app.post(
    "/api/stripe/webhook",
    async (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"];

      if (!sig) {
        console.error("[Stripe Webhook] Missing signature");
        return res.status(400).send("Missing signature");
      }

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET!
        );
      } catch (err: any) {
        console.error("[Stripe Webhook] Signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // CRITICAL: Handle test events for webhook verification
      if (event.id.startsWith("evt_test_")) {
        console.log("[Stripe Webhook] Test event detected, returning verification response");
        return res.json({
          verified: true,
        });
      }

      console.log("[Stripe Webhook] Event received:", event.type, event.id);

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            await handleCheckoutSessionCompleted(session);
            break;
          }

          case "payment_intent.succeeded": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            await handlePaymentIntentSucceeded(paymentIntent);
            break;
          }

          case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            await handlePaymentIntentFailed(paymentIntent);
            break;
          }

          default:
            console.log("[Stripe Webhook] Unhandled event type:", event.type);
        }

        res.json({ received: true });
      } catch (error: any) {
        console.error("[Stripe Webhook] Error processing event:", error);
        res.status(500).send(`Webhook processing error: ${error.message}`);
      }
    }
  );
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log("[Stripe Webhook] Checkout session completed:", session.id);

  const userId = parseInt(session.metadata?.user_id || session.client_reference_id || "0");
  if (!userId) {
    console.error("[Stripe Webhook] No user ID in session metadata");
    return;
  }

  // Create payment record
  await paymentDb.createPayment({
    userId,
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId: session.payment_intent as string,
    amount: session.amount_total || 0,
    currency: session.currency || "usd",
    status: session.payment_status === "paid" ? "succeeded" : "pending",
    paymentMethod: session.payment_method_types?.[0] || null,
  });

  // If payment is already completed, update user status
  if (session.payment_status === "paid") {
    await db.upsertUser({
      openId: "", // Will be ignored in update
      id: userId,
      hasPaid: true,
      isWhitelisted: true, // Automatically whitelist on successful payment
    });
    console.log("[Stripe Webhook] User whitelisted:", userId);
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log("[Stripe Webhook] Payment intent succeeded:", paymentIntent.id);

  // Update payment status
  // Fetch charge separately to get receipt URL
  let receiptUrl: string | undefined;
  if (paymentIntent.latest_charge) {
    const charge = await stripe.charges.retrieve(paymentIntent.latest_charge as string);
    receiptUrl = charge.receipt_url || undefined;
  }

  await paymentDb.updatePaymentStatus(paymentIntent.id, "succeeded", receiptUrl);

  // Get payment record to find user
  const payment = await paymentDb.getPaymentByStripePaymentIntentId(paymentIntent.id);
  if (payment) {
    // Update user whitelist status
    await db.upsertUser({
      openId: "", // Will be ignored in update
      id: payment.userId,
      hasPaid: true,
      isWhitelisted: true,
    });
    console.log("[Stripe Webhook] User whitelisted after payment:", payment.userId);
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log("[Stripe Webhook] Payment intent failed:", paymentIntent.id);

  await paymentDb.updatePaymentStatus(paymentIntent.id, "failed");
}
