"use client";

import { useState, useTransition } from "react";
import type { Availability, Instructor } from "@/types/database";
import { createBooking } from "@/app/actions/booking";
import { calculateDeposit } from "@/lib/stripe";
import { formatTime, calculateSlotPrice } from "@/lib/time";

interface Props {
  readonly slot: Availability;
  readonly instructor: Instructor;
}

export function BookingSummary({ slot, instructor }: Props) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const total = calculateSlotPrice(
    slot.start_time,
    slot.end_time,
    instructor.price_per_hour,
  );
  const deposit = calculateDeposit(total);
  const formattedDate = new Date(slot.date + "T00:00:00").toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric" },
  );

  function handleBook() {
    setError(null);
    startTransition(async () => {
      const result = await createBooking({
        availabilityId: slot.id,
        instructorId: instructor.id,
        notes: notes || undefined,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      if ("checkoutUrl" in result.data) {
        window.location.href = result.data.checkoutUrl;
      } else {
        window.location.href = `/bookings/${result.data.bookingId}?success=true`;
      }
    });
  }

  return (
    <div className="rounded-2xl border border-ice/20 bg-mountain-800/70 p-5">
      <h3 className="font-display text-lg font-semibold text-snow">
        Booking Summary
      </h3>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-snow-300">Instructor</dt>
          <dd className="font-medium text-snow">{instructor.name}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-snow-300">Date</dt>
          <dd className="font-medium text-snow">{formattedDate}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-snow-300">Time</dt>
          <dd className="font-medium text-snow">
            {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-snow-300">Resort</dt>
          <dd className="font-medium text-snow capitalize">
            {slot.resort_slug}
          </dd>
        </div>

        <div className="border-t border-white/5 pt-3">
          <div className="flex justify-between">
            <dt className="text-snow-300">Total</dt>
            <dd className="font-medium text-snow">
              {total.toLocaleString()} AMD
            </dd>
          </div>
          <div className="flex justify-between mt-1">
            <dt className="text-ice/80">Due now (20% deposit)</dt>
            <dd className="font-bold text-ice">
              {deposit.toLocaleString()} AMD
            </dd>
          </div>
          <p className="mt-1 text-[11px] text-mountain-600">
            Remaining {(total - deposit).toLocaleString()} AMD paid at the
            resort
          </p>
        </div>
      </dl>

      {/* Notes */}
      <div className="mt-4">
        <label
          htmlFor="booking-notes"
          className="block text-xs font-medium text-snow-300 mb-1.5"
        >
          Notes for your instructor (optional)
        </label>
        <textarea
          id="booking-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={500}
          rows={2}
          placeholder="Experience level, goals, special requests..."
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-snow placeholder:text-mountain-600 focus:border-ice/30 focus:outline-none focus:ring-1 focus:ring-ice/30"
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <button
        onClick={handleBook}
        disabled={isPending}
        className="mt-4 w-full rounded-xl bg-ice px-6 py-3.5 text-base font-semibold text-mountain transition-all hover:bg-ice-light hover:shadow-lg hover:shadow-ice/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending
          ? "Processing..."
          : `Pay ${deposit.toLocaleString()} AMD Deposit`}
      </button>

      <p className="mt-3 text-center text-[11px] text-mountain-600">
        Free cancellation up to 48 hours before your lesson
      </p>
    </div>
  );
}
