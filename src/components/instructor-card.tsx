import Link from "next/link";
import type { Instructor } from "@/data/instructors";
import { resorts } from "@/data/resorts";

function SportBadge({ sport }: { readonly sport: Instructor["sport"] }) {
  const labels = { ski: "Ski", snowboard: "Snowboard", both: "Ski & Board" };
  const colors = {
    ski: "bg-blue-500/20 text-blue-300",
    snowboard: "bg-purple-500/20 text-purple-300",
    both: "bg-amber-500/20 text-amber-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[sport]}`}
    >
      {labels[sport]}
    </span>
  );
}

function getResortName(slug: string): string {
  return resorts.find((r) => r.slug === slug)?.name ?? slug;
}

export function InstructorCard({
  instructor,
}: {
  readonly instructor: Instructor;
}) {
  return (
    <div className="card-hover group rounded-2xl bg-mountain-800/50 border border-white/5 overflow-hidden">
      {/* Photo placeholder with gradient */}
      <div className="relative h-56 bg-gradient-to-br from-ice-dark/30 via-mountain-800 to-mountain overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-3xl font-display font-bold text-white/40">
            {instructor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-mountain-800/90 to-transparent" />
        {/* Featured badge */}
        {instructor.featured && (
          <div className="absolute top-3 right-3 rounded-full bg-gold/20 px-2.5 py-1 text-xs font-semibold text-gold-light">
            Featured
          </div>
        )}
        {/* Sport badge */}
        <div className="absolute bottom-3 left-3">
          <SportBadge sport={instructor.sport} />
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-snow">
              {instructor.name}
            </h3>
            <p className="mt-0.5 text-sm text-mountain-600">
              {instructor.experience} experience
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-ice">
              {instructor.pricePerHour.toLocaleString()}
            </p>
            <p className="text-xs text-mountain-600">AMD/hr</p>
          </div>
        </div>

        {/* Headline */}
        <p className="mt-2 text-sm font-medium text-ice/80 italic">
          &ldquo;{instructor.headline}&rdquo;
        </p>

        {/* Teaching style tags */}
        <div className="mt-2 flex flex-wrap gap-1">
          {instructor.teachingStyle.map((style) => (
            <span
              key={style}
              className="rounded-md bg-ice/10 px-1.5 py-0.5 text-[10px] font-medium text-ice/70"
            >
              {style}
            </span>
          ))}
        </div>

        {/* Resorts */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {instructor.resorts.map((slug) => (
            <Link
              key={slug}
              href={`/resorts/${slug}`}
              className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-snow-300 hover:bg-white/10 hover:text-snow transition-colors"
            >
              {getResortName(slug)}
            </Link>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-mountain-600">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.97.633-3.794 1.708-5.276"
            />
          </svg>
          {instructor.languages.join(", ")}
        </div>

        {/* Book button */}
        <Link
          href={`/instructors/${instructor.id}`}
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-ice/10 px-3 py-2.5 text-sm font-medium text-ice transition-colors hover:bg-ice/20"
        >
          View Profile & Book
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
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
