import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  const db = await createServiceRoleSupabase();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;

      if (!bookingId) break;

      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : (session.payment_intent?.id ?? null);

      // Update booking to confirmed
      const { error: updateError } = await db
        .from("bookings")
        .update({
          status: "confirmed",
          stripe_payment_intent_id: paymentIntentId,
        })
        .eq("id", bookingId);

      if (updateError) {
        console.error("Failed to confirm booking:", updateError);
        return NextResponse.json(
          { error: "Failed to update booking" },
          { status: 500 },
        );
      }

      // Record deposit payment
      const { error: paymentError } = await db.from("payments").insert({
        booking_id: bookingId,
        type: "deposit",
        amount: session.amount_total ?? 0,
        currency: session.currency ?? "amd",
        stripe_id: paymentIntentId,
      });

      if (paymentError) {
        console.error("Failed to record payment:", paymentError);
      }

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;

      if (!bookingId) break;

      // Cancel booking if checkout expired
      const { error: cancelError } = await db
        .from("bookings")
        .update({
          status: "cancelled",
          cancelled_at: new Date().toISOString(),
          cancellation_reason: "Payment session expired",
        })
        .eq("id", bookingId);

      if (cancelError) {
        console.error("Failed to cancel expired booking:", cancelError);
      }

      break;
    }
  }

  return NextResponse.json({ received: true });
}
