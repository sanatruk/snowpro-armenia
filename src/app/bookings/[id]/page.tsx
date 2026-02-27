import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { ReviewForm } from "@/components/booking/review-form";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string; cancelled?: string }>;
};

function formatTime(time: string): string {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:${m} ${ampm}`;
}

const statusStyles: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending Payment", color: "bg-yellow-500/20 text-yellow-300" },
  confirmed: { label: "Confirmed", color: "bg-green-500/20 text-green-300" },
  completed: { label: "Completed", color: "bg-blue-500/20 text-blue-300" },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-300" },
  no_show: { label: "No Show", color: "bg-gray-500/20 text-gray-300" },
};

export default async function BookingPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { success } = await searchParams;

  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !booking) {
    notFound();
  }

  // Fetch instructor name
  const { data: instructor } = await supabase
    .from("instructors")
    .select("name, slug")
    .eq("id", booking.instructor_id)
    .single();

  // Check for existing review
  const { data: existingReview } = await supabase
    .from("reviews")
    .select("id")
    .eq("booking_id", id)
    .single();

  const status = statusStyles[booking.status] ?? statusStyles.pending;
  const formattedDate = new Date(
    booking.date + "T00:00:00",
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-mountain" />
      <div className="relative z-10 mx-auto max-w-2xl px-4 pt-32 pb-16">
        {/* Success banner */}
        {success === "true" && (
          <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-center">
            <p className="text-green-400 font-medium">
              Booking confirmed! You&apos;ll receive a confirmation email
              shortly.
            </p>
          </div>
        )}

        {/* Booking card */}
        <div className="rounded-2xl border border-white/5 bg-mountain-800/50 p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">
                Your Booking
              </h1>
              <p className="mt-1 text-sm text-mountain-600">
                ID: {booking.id.slice(0, 8)}...
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${status.color}`}
            >
              {status.label}
            </span>
          </div>

          <dl className="mt-6 space-y-4">
            <div className="flex justify-between border-b border-white/5 pb-4">
              <dt className="text-snow-300">Instructor</dt>
              <dd className="font-medium text-snow">
                {instructor ? (
                  <Link
                    href={`/instructors/${instructor.slug}`}
                    className="text-ice hover:text-ice-light transition-colors"
                  >
                    {instructor.name}
                  </Link>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-4">
              <dt className="text-snow-300">Date</dt>
              <dd className="font-medium text-snow">{formattedDate}</dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-4">
              <dt className="text-snow-300">Time</dt>
              <dd className="font-medium text-snow">
                {formatTime(booking.start_time)} –{" "}
                {formatTime(booking.end_time)}
              </dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-4">
              <dt className="text-snow-300">Resort</dt>
              <dd className="font-medium text-snow capitalize">
                {booking.resort_slug}
              </dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-4">
              <dt className="text-snow-300">Total</dt>
              <dd className="font-medium text-snow">
                {booking.total_amount.toLocaleString()} AMD
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-snow-300">Deposit paid</dt>
              <dd className="font-bold text-ice">
                {booking.deposit_amount.toLocaleString()} AMD
              </dd>
            </div>
          </dl>

          {booking.notes && (
            <div className="mt-6 rounded-xl bg-white/5 p-4">
              <h3 className="text-xs font-medium text-mountain-600 uppercase">
                Notes
              </h3>
              <p className="mt-1 text-sm text-snow-300">{booking.notes}</p>
            </div>
          )}

          {booking.status === "cancelled" && booking.cancellation_reason && (
            <div className="mt-6 rounded-xl bg-red-500/5 border border-red-500/10 p-4">
              <h3 className="text-xs font-medium text-red-400 uppercase">
                Cancellation Reason
              </h3>
              <p className="mt-1 text-sm text-snow-300">
                {booking.cancellation_reason}
              </p>
            </div>
          )}
        </div>

        {/* Review form (for completed bookings without a review) */}
        {booking.status === "completed" && !existingReview && instructor && (
          <div className="mt-6">
            <ReviewForm
              bookingId={booking.id}
              instructorName={instructor.name}
            />
          </div>
        )}

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/instructors"
            className="text-sm text-ice hover:text-ice-light transition-colors"
          >
            Browse more instructors
          </Link>
        </div>
      </div>
    </div>
  );
}
