import type { Instructor, Review } from "@/types/database";

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Static instructor data for development (when Supabase isn't configured)
// In production, this is replaced by Supabase queries
export async function getInstructors(): Promise<readonly Instructor[]> {
  if (isSupabaseConfigured()) {
    const { createServerSupabase } = await import("@/lib/supabase/server");
    const supabase = await createServerSupabase();
    const { data } = await supabase
      .from("instructors")
      .select("*")
      .order("featured", { ascending: false })
      .order("rating_avg", { ascending: false });
    return data ?? [];
  }

  // Fallback: convert static data
  const { instructors } = await import("@/data/instructors");
  return instructors.map(staticToDbInstructor);
}

export async function getInstructorBySlug(
  slug: string,
): Promise<Instructor | null> {
  if (isSupabaseConfigured()) {
    const { createServerSupabase } = await import("@/lib/supabase/server");
    const supabase = await createServerSupabase();
    const { data } = await supabase
      .from("instructors")
      .select("*")
      .eq("slug", slug)
      .single();
    return data;
  }

  const { instructors } = await import("@/data/instructors");
  const found = instructors.find((i) => i.id === slug);
  return found ? staticToDbInstructor(found) : null;
}

export async function getFeaturedInstructorsList(): Promise<
  readonly Instructor[]
> {
  if (isSupabaseConfigured()) {
    const { createServerSupabase } = await import("@/lib/supabase/server");
    const supabase = await createServerSupabase();
    const { data } = await supabase
      .from("instructors")
      .select("*")
      .eq("featured", true)
      .limit(3);
    return data ?? [];
  }

  const { getFeaturedInstructors } = await import("@/data/instructors");
  return getFeaturedInstructors().map(staticToDbInstructor);
}

export async function getInstructorReviews(
  instructorId: string,
): Promise<readonly Review[]> {
  if (isSupabaseConfigured()) {
    const { createServerSupabase } = await import("@/lib/supabase/server");
    const supabase = await createServerSupabase();
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("instructor_id", instructorId)
      .order("created_at", { ascending: false })
      .limit(10);
    return data ?? [];
  }

  return [];
}

// Convert static instructor data to DB format
function staticToDbInstructor(
  s: import("@/data/instructors").Instructor,
): Instructor {
  return {
    id: s.id,
    name: s.name,
    slug: s.id,
    photo_url: s.photo,
    headline: s.headline,
    bio: s.bio,
    sport: s.sport,
    specialties: [...s.specialties],
    levels: [...s.levels],
    languages: [...s.languages],
    teaching_styles: [...s.teachingStyle],
    resorts: [...s.resorts],
    price_per_hour: s.pricePerHour,
    currency: s.currency,
    experience_years: parseInt(s.experience) || 0,
    certifications: s.certifications ? [...s.certifications] : [],
    stripe_account_id: null,
    stripe_onboarded: false,
    featured: s.featured ?? false,
    active: true,
    rating_avg: 0,
    rating_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
