"use server";

import { requireAuth } from "@/lib/auth";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import {
  getStripe,
  calculateDeposit,
  calculatePlatformFee,
} from "@/lib/stripe";
import { bookingSchema, cancelBookingSchema } from "@/lib/validations";
import type { Availability, Instructor, Booking } from "@/types/database";

type ActionResult =
  | { success: true; data: { checkoutUrl: string } }
  | { success: true; data: { bookingId: string } }
  | { success: false; error: string };

export async function createBooking(input: unknown): Promise<ActionResult> {
  const user = await requireAuth();

  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { availabilityId, instructorId, notes } = parsed.data;
  const db = await createServiceRoleSupabase();

  // Fetch availability slot
  const { data: slotRaw, error: slotError } = await db
    .from("availability")
    .select("*")
    .eq("id", availabilityId)
    .eq("is_booked", false)
    .single();

  if (slotError || !slotRaw) {
    return { success: false, error: "This time slot is no longer available" };
  }
  const slot = slotRaw as unknown as Availability;

  // Fetch instructor
  const { data: instrRaw, error: instrError } = await db
    .from("instructors")
    .select("*")
    .eq("id", instructorId)
    .eq("active", true)
    .single();

  if (instrError || !instrRaw) {
    return { success: false, error: "Instructor not found" };
  }
  const instructor = instrRaw as unknown as Instructor;

  // Verify instructor owns the slot
  if (slot.instructor_id !== instructorId) {
    return { success: false, error: "Slot does not belong to this instructor" };
  }

  // Calculate amounts (price per hour * duration in hours)
  const startMinutes =
    parseInt(slot.start_time.split(":")[0]) * 60 +
    parseInt(slot.start_time.split(":")[1]);
  const endMinutes =
    parseInt(slot.end_time.split(":")[0]) * 60 +
    parseInt(slot.end_time.split(":")[1]);
  const durationHours = (endMinutes - startMinutes) / 60;
  const totalAmount = Math.round(instructor.price_per_hour * durationHours);
  const depositAmount = calculateDeposit(totalAmount);
  const platformFee = calculatePlatformFee(totalAmount);

  // Create booking record
  const { data: bookingRaw, error: bookingError } = await db
    .from("bookings")
    .insert({
      student_id: user.id,
      instructor_id: instructorId,
      availability_id: availabilityId,
      resort_slug: slot.resort_slug,
      date: slot.date,
      start_time: slot.start_time,
      end_time: slot.end_time,
      status: "pending",
      total_amount: totalAmount,
      deposit_amount: depositAmount,
      platform_fee: platformFee,
      currency: "AMD",
      notes: notes ?? null,
    })
    .select()
    .single();

  if (bookingError || !bookingRaw) {
    return { success: false, error: "Failed to create booking" };
  }
  const booking = bookingRaw as unknown as Booking;

  // Create Stripe Checkout session for deposit
  if (instructor.stripe_account_id && instructor.stripe_onboarded) {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "amd",
            product_data: {
              name: `Lesson with ${instructor.name}`,
              description: `${slot.date} ${slot.start_time}–${slot.end_time} at ${slot.resort_slug}`,
            },
            unit_amount: depositAmount,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: Math.round(depositAmount * 0.1),
        transfer_data: {
          destination: instructor.stripe_account_id,
        },
      },
      metadata: {
        booking_id: booking.id,
        type: "deposit",
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/bookings/${booking.id}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/bookings/${booking.id}?cancelled=true`,
    });

    // Update booking with checkout session
    await db
      .from("bookings")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", booking.id);

    return { success: true, data: { checkoutUrl: session.url! } };
  }

  // No Stripe setup — confirm booking directly (MVP fallback)
  await db
    .from("bookings")
    .update({ status: "confirmed" })
    .eq("id", booking.id);

  return { success: true, data: { bookingId: booking.id } };
}

export async function cancelBooking(
  input: unknown,
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth();

  const parsed = cancelBookingSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { bookingId, reason } = parsed.data;
  const db = await createServiceRoleSupabase();

  // Fetch booking
  const { data: bookingRaw2, error: fetchError } = await db
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .eq("student_id", user.id)
    .single();

  if (fetchError || !bookingRaw2) {
    return { success: false, error: "Booking not found" };
  }
  const cancelTarget = bookingRaw2 as unknown as Booking;

  if (
    cancelTarget.status !== "pending" &&
    cancelTarget.status !== "confirmed"
  ) {
    return { success: false, error: "This booking cannot be cancelled" };
  }

  // Check 48-hour cancellation policy
  const lessonDate = new Date(
    `${cancelTarget.date}T${cancelTarget.start_time}`,
  );
  const now = new Date();
  const hoursUntilLesson =
    (lessonDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  const eligibleForRefund = hoursUntilLesson >= 48;

  // Update booking status
  await db
    .from("bookings")
    .update({
      status: "cancelled",
      cancelled_at: new Date().toISOString(),
      cancellation_reason: reason,
    })
    .eq("id", bookingId);

  // Process refund if eligible and payment was made
  if (eligibleForRefund && cancelTarget.stripe_payment_intent_id) {
    const refund = await getStripe().refunds.create({
      payment_intent: cancelTarget.stripe_payment_intent_id,
    });

    await db.from("payments").insert({
      booking_id: bookingId,
      type: "refund",
      amount: cancelTarget.deposit_amount,
      currency: cancelTarget.currency,
      stripe_id: refund.id,
    });
  }

  return { success: true };
}
