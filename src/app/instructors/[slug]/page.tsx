import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { InstructorProfile } from "./instructor-profile";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabase();
  const { data: instructor } = await supabase
    .from("instructors")
    .select("name, headline, sport")
    .eq("slug", slug)
    .single();

  if (!instructor) return {};

  return {
    title: `${instructor.name} — ${instructor.sport === "both" ? "Ski & Snowboard" : instructor.sport === "ski" ? "Ski" : "Snowboard"} Instructor`,
    description: instructor.headline,
  };
}

export default async function InstructorPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerSupabase();

  // Fetch instructor
  const { data: instructor, error } = await supabase
    .from("instructors")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !instructor) {
    notFound();
  }

  // Fetch available slots (next 5 weeks)
  const today = new Date().toISOString().split("T")[0];
  const fiveWeeks = new Date();
  fiveWeeks.setDate(fiveWeeks.getDate() + 35);
  const endDate = fiveWeeks.toISOString().split("T")[0];

  const { data: slots } = await supabase
    .from("availability")
    .select("*")
    .eq("instructor_id", instructor.id)
    .gte("date", today)
    .lte("date", endDate)
    .order("date")
    .order("start_time");

  // Fetch reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("instructor_id", instructor.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-mountain" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/instructors"
            className="inline-flex items-center gap-1.5 text-sm text-snow-300 hover:text-ice transition-colors mb-6"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            All Instructors
          </Link>
        </div>
      </section>

      {/* Profile + Booking */}
      <InstructorProfile
        instructor={instructor}
        slots={slots ?? []}
        reviews={reviews ?? []}
      />
    </>
  );
}
