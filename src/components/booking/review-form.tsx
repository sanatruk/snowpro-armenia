"use client";

import { useState, useTransition } from "react";
import { submitReview } from "@/app/actions/review";

interface Props {
  readonly bookingId: string;
  readonly instructorName: string;
  readonly onSuccess?: () => void;
}

export function ReviewForm({ bookingId, instructorName, onSuccess }: Props) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await submitReview({
        bookingId,
        rating,
        comment: comment || undefined,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setSubmitted(true);
      onSuccess?.();
    });
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 text-center">
        <p className="text-lg font-semibold text-green-400">
          Thank you for your review!
        </p>
        <p className="mt-1 text-sm text-snow-300">
          Your feedback helps other students find the right instructor.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-mountain-800/50 p-5">
      <h3 className="font-display text-lg font-semibold text-snow">
        Rate your lesson with {instructorName}
      </h3>

      {/* Star rating */}
      <div className="mt-4 flex gap-1">
        {Array.from({ length: 5 }, (_, i) => {
          const starValue = i + 1;
          const isFilled =
            starValue <= (hoveredRating || rating);

          return (
            <button
              key={starValue}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHoveredRating(starValue)}
              onMouseLeave={() => setHoveredRating(0)}
              className={`transition-colors ${
                isFilled ? "text-gold" : "text-mountain-600"
              }`}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Comment */}
      <div className="mt-4">
        <label
          htmlFor="review-comment"
          className="block text-xs font-medium text-snow-300 mb-1.5"
        >
          Tell others about your experience (optional)
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1000}
          rows={3}
          placeholder="How was the lesson? What did you learn?"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-snow placeholder:text-mountain-600 focus:border-ice/30 focus:outline-none focus:ring-1 focus:ring-ice/30"
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={isPending || rating === 0}
        className="mt-4 w-full rounded-xl bg-ice px-6 py-3 text-base font-semibold text-mountain transition-all hover:bg-ice-light disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
