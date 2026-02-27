import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resorts, getResortBySlug } from "@/data/resorts";
import { getInstructorsByResort } from "@/data/instructors";
import { InstructorCard } from "@/components/instructor-card";

export function generateStaticParams() {
  return resorts.map((resort) => ({ slug: resort.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resort = getResortBySlug(slug);
  if (!resort) return {};
  return {
    title: `${resort.name} — Ski & Snowboard`,
    description: resort.description,
  };
}

function StatCard({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-center">
      <p className="text-2xl font-bold text-ice">{value}</p>
      <p className="mt-1 text-xs text-snow-300">{label}</p>
    </div>
  );
}

export default async function ResortPage({ params }: Props) {
  const { slug } = await params;
  const resort = getResortBySlug(slug);
  if (!resort) notFound();

  const instructors = getInstructorsByResort(slug);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-b ${resort.heroGradient}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_60%)]" />

        {/* Mountain silhouette */}
        <svg
          className="absolute inset-x-0 bottom-0 h-32 text-mountain"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <polygon points="0,200 0,140 180,70 360,110 540,40 720,90 900,30 1080,80 1260,50 1440,100 1440,200" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <Link
            href="/"
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
            All Resorts
          </Link>
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl animate-fade-in-up">
            {resort.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-snow-300 animate-fade-in-up stagger-2">
            {resort.tagline}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            <StatCard label="Slopes" value={resort.slopes} />
            <StatCard label="Lifts" value={String(resort.lifts)} />
            <StatCard
              label="Base Elevation"
              value={`${resort.elevation.base.toLocaleString()}m`}
            />
            <StatCard
              label="Peak Elevation"
              value={`${resort.elevation.peak.toLocaleString()}m`}
            />
            <StatCard
              label="Vertical Drop"
              value={`${resort.verticalDrop}m`}
            />
            <StatCard label="From Yerevan" value={resort.driveTime} />
          </div>
        </div>
      </section>

      {/* Description + Details */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main description */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold">
                About {resort.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-snow-300">
                {resort.description}
              </p>

              {/* Features */}
              <h3 className="mt-10 font-display text-xl font-semibold">
                Resort Features
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {resort.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3"
                  >
                    <svg
                      className="h-5 w-5 text-ice shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-sm text-snow-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Season info */}
              <div className="rounded-2xl border border-white/5 bg-mountain-800/50 p-6">
                <h3 className="font-display text-lg font-semibold">
                  Season Info
                </h3>
                <dl className="mt-4 space-y-3">
                  <div>
                    <dt className="text-xs text-mountain-600">Season</dt>
                    <dd className="text-sm text-snow-200">{resort.season}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-mountain-600">
                      Distance from Yerevan
                    </dt>
                    <dd className="text-sm text-snow-200">
                      {resort.distanceFromYerevan} ({resort.driveTime})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-mountain-600">Lift Ticket</dt>
                    <dd className="text-sm text-snow-200">
                      {resort.liftTicketPrice}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Equipment rental */}
              <div className="rounded-2xl border border-white/5 bg-mountain-800/50 p-6">
                <h3 className="font-display text-lg font-semibold">
                  Equipment Rental
                </h3>
                <dl className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-snow-300">Ski set</dt>
                    <dd className="text-sm font-medium text-snow-200">
                      {resort.equipmentRental.ski}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-snow-300">Snowboard set</dt>
                    <dd className="text-sm font-medium text-snow-200">
                      {resort.equipmentRental.snowboard}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-snow-300">Helmet</dt>
                    <dd className="text-sm font-medium text-snow-200">
                      {resort.equipmentRental.helmet}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Getting there */}
              <div className="rounded-2xl border border-white/5 bg-mountain-800/50 p-6">
                <h3 className="font-display text-lg font-semibold">
                  Getting There
                </h3>
                <p className="mt-3 text-sm text-snow-300">
                  {resort.distanceFromYerevan} from Yerevan center. Drive time
                  approximately {resort.driveTime}. Taxis from Yerevan cost
                  around 8,000–15,000 AMD. Shuttle services also available during
                  peak season.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors at this resort */}
      {instructors.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold">
                  Instructors at {resort.name}
                </h2>
                <p className="mt-2 text-base text-snow-300">
                  {instructors.length} instructor
                  {instructors.length !== 1 ? "s" : ""} available
                </p>
              </div>
              <Link
                href="/instructors"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-ice hover:text-ice-light transition-colors"
              >
                View all
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

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {instructors.map((instructor) => (
                <InstructorCard
                  key={instructor.id}
                  instructor={instructor}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
