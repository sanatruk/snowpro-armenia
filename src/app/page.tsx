import Link from "next/link";
import { resorts } from "@/data/resorts";
import { getFeaturedInstructors } from "@/data/instructors";
import { ResortCard } from "@/components/resort-card";
import { InstructorCard } from "@/components/instructor-card";

function MountainSVG() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-32 sm:h-48 text-mountain"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      fill="currentColor"
    >
      <polygon points="0,200 0,120 120,60 240,100 360,40 480,80 600,30 720,70 840,20 960,60 1080,35 1200,75 1320,45 1440,90 1440,200" />
    </svg>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-slate-900 to-mountain" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_60%)]" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-ice/5 blur-3xl" />
      <div className="absolute bottom-40 right-20 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />

      {/* Snow particles (decorative dots) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <MountainSVG />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="animate-fade-in-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-ice border border-ice/20">
              <span className="h-1.5 w-1.5 rounded-full bg-ice animate-pulse" />
              Season 2025–2026 is live
            </p>
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up stagger-2">
            Your Instructor.{" "}
            <span className="shimmer-text">Your Mountain.</span>
            <br />
            Book in 60 Seconds.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-snow-300 animate-fade-in-up stagger-3">
            Browse verified ski &amp; snowboard pros at Tsaghkadzor, MyLer, and
            Jermuk. See real reviews, check live availability, and lock in your
            lesson — no booking fees, ever.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-in-up stagger-4">
            <Link
              href="/instructors"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ice px-6 py-3.5 text-base font-semibold text-mountain transition-all hover:bg-ice-light hover:shadow-lg hover:shadow-ice/20 hover:-translate-y-0.5"
            >
              Browse Instructors
              <svg
                className="h-5 w-5"
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
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-base font-medium text-snow-300 transition-all hover:bg-white/5 hover:text-snow"
            >
              How It Works
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-12 flex gap-8 animate-fade-in-up stagger-5">
            <div>
              <p className="text-3xl font-bold text-snow">3</p>
              <p className="text-sm text-mountain-600">Resorts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-snow">6+</p>
              <p className="text-sm text-mountain-600">Verified Pros</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-snow">54km</p>
              <p className="text-sm text-mountain-600">Total Slopes</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-snow">2,850m</p>
              <p className="text-sm text-mountain-600">Peak Elevation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResortsSection() {
  const mainResorts = resorts.filter((r) => r.slug !== "jermuk");
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Armenia&apos;s Premier Resorts
          </h2>
          <p className="mt-3 text-lg text-snow-300">
            Two world-class mountains, one hour from Yerevan
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {mainResorts.map((resort) => (
            <ResortCard key={resort.slug} resort={resort} />
          ))}
        </div>

        {/* Jermuk teaser */}
        <div className="mt-6">
          <Link
            href="/resorts/jermuk"
            className="group block rounded-2xl border border-white/5 bg-mountain-800/30 p-6 transition-all hover:bg-mountain-800/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold text-snow group-hover:text-ice transition-colors">
                  Jermuk
                </h3>
                <p className="mt-1 text-sm text-snow-300">
                  Gentle slopes + legendary hot springs — zero intimidation, all
                  the fun.
                </p>
              </div>
              <div className="flex items-center gap-3 text-snow-300">
                <span className="text-sm">3km slopes</span>
                <svg
                  className="h-5 w-5 text-ice group-hover:translate-x-1 transition-transform"
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
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function InstructorsSection() {
  const featured = getFeaturedInstructors();
  return (
    <section className="relative py-24 bg-gradient-to-b from-mountain via-mountain-800/50 to-mountain">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Featured Instructors
            </h2>
            <p className="mt-3 text-lg text-snow-300">
              Certified pros who know every run
            </p>
          </div>
          <Link
            href="/instructors"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-ice hover:text-ice-light transition-colors"
          >
            View all instructors
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/instructors"
            className="inline-flex items-center gap-1 text-sm font-medium text-ice"
          >
            View all instructors
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
    </section>
  );
}

function SocialProofSection() {
  const testimonials = [
    {
      quote:
        "Gor had my 8-year-old snowboarding by lunch. We've booked 3 more lessons since.",
      name: "Armine K.",
      location: "Yerevan",
    },
    {
      quote:
        "First time skiing at 35. Anna made it feel easy. Already planning a return trip.",
      name: "David M.",
      location: "Moscow",
    },
    {
      quote:
        "Best value ski instruction I've found anywhere. Half the price of the Alps with just as good teaching.",
      name: "Tom R.",
      location: "London",
    },
  ] as const;

  return (
    <section className="relative py-20 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-ice">
            Trusted by students this season
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-white/5 bg-mountain-800/30 p-6"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-snow-300 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-3 text-sm font-medium text-snow">
                {t.name}{" "}
                <span className="text-mountain-600">· {t.location}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Pick Your Resort",
      description:
        "Choose Tsaghkadzor, MyLer, or Jermuk. Not sure? Filter by skill level — we'll show you which resort fits.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Choose Your Instructor",
      description:
        "Browse real profiles with reviews, languages, and pricing. Read what past students say. Find the right match.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Book & Pay Securely",
      description:
        "Select your date, pay a 20% deposit to lock it in, and get instant confirmation. No booking fees. Cancel free up to 48 hours before.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-lg text-snow-300">
            From zero to shredding in three simple steps
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              {/* Number */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ice/10 text-ice">
                {step.icon}
              </div>
              <p className="mt-4 font-display text-sm font-medium text-ice/60">
                {step.number}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-snow-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ice-dark via-blue-600 to-purple-700 p-12 sm:p-16">
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              The season&apos;s open. Your instructor is waiting.
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Peak season is January through February — the most popular
              instructors fill up weeks in advance. Lock in your dates now with
              a 20% deposit and cancel free if plans change.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/instructors"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-mountain transition-all hover:bg-snow-100 hover:shadow-lg"
              >
                Book Your Instructor
              </Link>
              <Link
                href="/about#faq"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 text-base font-medium text-white transition-all hover:bg-white/10"
              >
                Got Questions? Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ResortsSection />
      <InstructorsSection />
      <SocialProofSection />
      <HowItWorksSection />
      <CTASection />
    </>
  );
}
