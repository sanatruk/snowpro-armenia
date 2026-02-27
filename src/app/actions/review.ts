"use server";

import { requireAuth } from "@/lib/auth";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import { reviewSchema } from "@/lib/validations";
import type { Booking, Review } from "@/types/database";

type ReviewResult =
  | { success: true; data: { reviewId: string } }
  | { success: false; error: string };

export async function submitReview(input: unknown): Promise<ReviewResult> {
  const user = await requireAuth();

  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { bookingId, rating, comment } = parsed.data;
  const db = await createServiceRoleSupabase();

  // Verify booking belongs to user and is completed
  const { data: bookingRaw, error: fetchError } = await db
    .from("bookings")
    .select("id, instructor_id, status, student_id")
    .eq("id", bookingId)
    .eq("student_id", user.id)
    .single();

  if (fetchError || !bookingRaw) {
    return { success: false, error: "Booking not found" };
  }
  const bookingData = bookingRaw as unknown as Pick<
    Booking,
    "id" | "instructor_id" | "status" | "student_id"
  >;

  if (bookingData.status !== "completed") {
    return {
      success: false,
      error: "You can only review completed lessons",
    };
  }

  // Check for existing review
  const { data: existingReview } = await db
    .from("reviews")
    .select("id")
    .eq("booking_id", bookingId)
    .single();

  if (existingReview) {
    return {
      success: false,
      error: "You have already reviewed this lesson",
    };
  }

  // Insert review (triggers rating update on instructor)
  const { data: reviewRaw, error: reviewError } = await db
    .from("reviews")
    .insert({
      booking_id: bookingId,
      student_id: user.id,
      instructor_id: bookingData.instructor_id,
      rating,
      comment: comment ?? null,
    })
    .select()
    .single();

  if (reviewError || !reviewRaw) {
    return { success: false, error: "Failed to submit review" };
  }
  const review = reviewRaw as unknown as Review;

  return { success: true, data: { reviewId: review.id } };
}
