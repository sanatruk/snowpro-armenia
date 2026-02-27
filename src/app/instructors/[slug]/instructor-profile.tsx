"use client";

import { useState } from "react";
import type { Instructor, Availability, Review } from "@/types/database";
import { AvailabilityCalendar } from "@/components/booking/availability-calendar";
import { BookingSummary } from "@/components/booking/booking-summary";

interface Props {
  readonly instructor: Instructor;
  readonly slots: readonly Availability[];
  readonly reviews: readonly Review[];
}

function SportBadge({ sport }: { readonly sport: string }) {
  const labels: Record<string, string> = {
    ski: "Ski",
    snowboard: "Snowboard",
    both: "Ski & Snowboard",
  };
  const colors: Record<string, string> = {
    ski: "bg-blue-500/20 text-blue-300",
    snowboard: "bg-purple-500/20 text-purple-300",
    both: "bg-amber-500/20 text-amber-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${colors[sport] ?? "bg-white/10 text-snow-300"}`}
    >
      {labels[sport] ?? sport}
    </span>
  );
}

function StarRating({ rating, count }: { readonly rating: number; readonly count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${i < Math.round(rating) ? "text-gold" : "text-mountain-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-snow-300">
        {rating.toFixed(1)} ({count} review{count !== 1 ? "s" : ""})
      </span>
    </div>
  );
}

export function InstructorProfile({ instructor, slots, reviews }: Props) {
  const [selectedSlot, setSelectedSlot] = useState<Availability | null>(null);

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Profile info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="flex gap-6">
              {/* Avatar */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ice-dark/30 via-mountain-800 to-mountain text-3xl font-display font-bold text-white/40">
                {instructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-display text-3xl font-bold">
                    {instructor.name}
                  </h1>
                  <SportBadge sport={instructor.sport} />
                  {instructor.featured && (
                    <span className="rounded-full bg-gold/20 px-2.5 py-1 text-xs font-semibold text-gold-light">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-1 text-ice/80 italic">
                  &ldquo;{instructor.headline}&rdquo;
                </p>
                {instructor.rating_count > 0 && (
                  <div className="mt-2">
                    <StarRating
                      rating={instructor.rating_avg}
                      count={instructor.rating_count}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="font-display text-xl font-semibold mb-3">
                About
              </h2>
              <p className="text-snow-300 leading-relaxed">
                {instructor.bio}
              </p>
            </div>

            {/* Details grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/5 border border-white/5 p-4">
                <h3 className="text-xs font-medium text-mountain-600 uppercase tracking-wider">
                  Experience
                </h3>
                <p className="mt-1 text-sm text-snow">
                  {instructor.experience_years} years
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/5 p-4">
                <h3 className="text-xs font-medium text-mountain-600 uppercase tracking-wider">
                  Languages
                </h3>
                <p className="mt-1 text-sm text-snow">
                  {instructor.languages.join(", ")}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/5 p-4">
                <h3 className="text-xs font-medium text-mountain-600 uppercase tracking-wider">
                  Specialties
                </h3>
                <p className="mt-1 text-sm text-snow">
                  {instructor.specialties.join(", ")}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/5 p-4">
                <h3 className="text-xs font-medium text-mountain-600 uppercase tracking-wider">
                  Certifications
                </h3>
                <p className="mt-1 text-sm text-snow">
                  {instructor.certifications.length > 0
                    ? instructor.certifications.join(", ")
                    : "—"}
                </p>
              </div>
            </div>

            {/* Teaching styles */}
            <div>
              <h2 className="font-display text-xl font-semibold mb-3">
                Teaching Style
              </h2>
              <div className="flex flex-wrap gap-2">
                {instructor.teaching_styles.map((style) => (
                  <span
                    key={style}
                    className="rounded-lg bg-ice/10 px-3 py-1.5 text-sm font-medium text-ice/80"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div>
              <h2 className="font-display text-xl font-semibold mb-3">
                Skill Levels
              </h2>
              <div className="flex flex-wrap gap-2">
                {instructor.levels.map((level) => (
                  <span
                    key={level}
                    className="rounded-lg bg-white/5 px-3 py-1.5 text-sm font-medium text-snow-300 capitalize"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">
                  Reviews
                </h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-xl border border-white/5 bg-mountain-800/30 p-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              className={`h-3.5 w-3.5 ${i < review.rating ? "text-gold" : "text-mountain-600"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-mountain-600">
                          {new Date(review.created_at).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </span>
                      </div>
                      {review.comment && (
                        <p className="mt-2 text-sm text-snow-300">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar */}
            <div>
              <h2 className="font-display text-xl font-semibold mb-4">
                Availability
              </h2>
              {slots.length > 0 ? (
                <AvailabilityCalendar
                  slots={slots}
                  pricePerHour={instructor.price_per_hour}
                  onSelectSlot={setSelectedSlot}
                  selectedSlotId={selectedSlot?.id}
                />
              ) : (
                <div className="rounded-2xl border border-white/5 bg-mountain-800/30 py-12 text-center">
                  <p className="text-snow-300">
                    No availability posted yet. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Price card */}
              <div className="rounded-2xl border border-white/5 bg-mountain-800/50 p-5">
                <p className="text-3xl font-bold text-ice">
                  {instructor.price_per_hour.toLocaleString()}
                  <span className="text-base font-normal text-mountain-600">
                    {" "}
                    AMD/hr
                  </span>
                </p>
                <p className="mt-1 text-sm text-snow-300">
                  20% deposit to book · Free cancellation 48h before
                </p>
              </div>

              {/* Booking summary (when slot selected) */}
              {selectedSlot ? (
                <BookingSummary
                  slot={selectedSlot}
                  instructor={instructor}
                />
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 bg-mountain-800/20 p-6 text-center">
                  <svg
                    className="mx-auto h-8 w-8 text-mountain-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-mountain-600">
                    Select a time slot from the calendar to book
                  </p>
                </div>
              )}

              {/* Resorts */}
              <div className="rounded-2xl border border-white/5 bg-mountain-800/50 p-5">
                <h3 className="text-xs font-medium text-mountain-600 uppercase tracking-wider">
                  Teaches at
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {instructor.resorts.map((resort) => (
                    <span
                      key={resort}
                      className="rounded-md bg-white/5 px-2.5 py-1 text-sm text-snow-300 capitalize"
                    >
                      {resort}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
