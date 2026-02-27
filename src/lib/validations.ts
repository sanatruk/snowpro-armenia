import { z } from "zod";

export const bookingSchema = z.object({
  availabilityId: z.string().uuid("Invalid availability slot"),
  instructorId: z.string().uuid("Invalid instructor"),
  notes: z
    .string()
    .max(500, "Notes must be under 500 characters")
    .optional(),
});

export const cancelBookingSchema = z.object({
  bookingId: z.string().uuid("Invalid booking ID"),
  reason: z
    .string()
    .min(1, "Please provide a reason")
    .max(500, "Reason must be under 500 characters"),
});

export const reviewSchema = z.object({
  bookingId: z.string().uuid("Invalid booking ID"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .max(1000, "Comment must be under 1000 characters")
    .optional(),
});

export const availabilitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  resortSlug: z.string().min(1, "Resort is required"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type AvailabilityInput = z.infer<typeof availabilitySchema>;
