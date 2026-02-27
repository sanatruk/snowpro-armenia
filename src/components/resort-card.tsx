import Link from "next/link";
import type { Resort } from "@/data/resorts";

export function ResortCard({ resort }: { readonly resort: Resort }) {
  return (
    <Link href={`/resorts/${resort.slug}`} className="group block">
      <div className="card-hover relative overflow-hidden rounded-2xl border border-white/5">
        {/* Background gradient */}
        <div
          className={`h-64 bg-gradient-to-br ${resort.heroGradient} relative`}
        >
          {/* Mountain silhouette decoration */}
          <svg
            className="absolute inset-x-0 bottom-0 h-24 text-mountain-800/30"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
          >
            <polygon
              fill="currentColor"
              points="0,100 0,60 50,30 100,55 150,20 200,50 250,15 300,45 350,25 400,50 400,100"
            />
          </svg>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-snow group-hover:text-ice transition-colors">
                {resort.name}
              </h3>
              <p className="mt-1 text-sm text-snow-300/80">
                {resort.tagline}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div>
                <p className="text-2xl font-bold text-ice">
                  {resort.slopes}
                </p>
                <p className="text-xs text-snow-300/60">Slopes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-ice">
                  {resort.lifts}
                </p>
                <p className="text-xs text-snow-300/60">Lifts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-ice">
                  {resort.elevation.peak.toLocaleString()}m
                </p>
                <p className="text-xs text-snow-300/60">Peak</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-ice">
                  {resort.driveTime}
                </p>
                <p className="text-xs text-snow-300/60">From Yerevan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between bg-mountain-800/80 px-6 py-3">
          <p className="text-sm text-snow-300">
            Season: {resort.season}
          </p>
          <span className="flex items-center gap-1 text-sm font-medium text-ice group-hover:gap-2 transition-all">
            Explore
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
          </span>
        </div>
      </div>
    </Link>
  );
}
