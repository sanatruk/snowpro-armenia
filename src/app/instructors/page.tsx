"use client";

import { useState, useMemo } from "react";
import { instructors, type Sport } from "@/data/instructors";
import { resorts } from "@/data/resorts";
import { InstructorCard } from "@/components/instructor-card";

type FilterState = {
  readonly resort: string;
  readonly sport: string;
  readonly language: string;
};

const initialFilters: FilterState = {
  resort: "all",
  sport: "all",
  language: "all",
};

const allLanguages = Array.from(
  new Set(instructors.flatMap((i) => i.languages)),
).sort();

function FilterButton({
  label,
  active,
  onClick,
}: {
  readonly label: string;
  readonly active: boolean;
  readonly onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
        active
          ? "bg-ice text-mountain"
          : "bg-white/5 text-snow-300 hover:bg-white/10 hover:text-snow"
      }`}
    >
      {label}
    </button>
  );
}

export default function InstructorsPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filtered = useMemo(() => {
    return instructors.filter((instructor) => {
      if (
        filters.resort !== "all" &&
        !instructor.resorts.includes(filters.resort)
      )
        return false;
      if (
        filters.sport !== "all" &&
        instructor.sport !== filters.sport &&
        instructor.sport !== "both"
      )
        return false;
      if (
        filters.language !== "all" &&
        !instructor.languages.some((lang) => lang === filters.language)
      )
        return false;
      return true;
    });
  }, [filters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "all",
  ).length;

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-mountain" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl animate-fade-in-up">
            Find Your Instructor
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-snow-300 animate-fade-in-up stagger-2">
            Browse our roster of certified professionals. Message them directly
            — no booking fees, no middlemen.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 border-b border-white/5 glass py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-6">
            {/* Resort filter */}
            <div>
              <label className="block text-xs font-medium text-mountain-600 mb-1.5">
                Resort
              </label>
              <div className="flex flex-wrap gap-1.5">
                <FilterButton
                  label="All"
                  active={filters.resort === "all"}
                  onClick={() => updateFilter("resort", "all")}
                />
                {resorts.map((r) => (
                  <FilterButton
                    key={r.slug}
                    label={r.name.replace(" Mountain Resort", "")}
                    active={filters.resort === r.slug}
                    onClick={() => updateFilter("resort", r.slug)}
                  />
                ))}
              </div>
            </div>

            {/* Sport filter */}
            <div>
              <label className="block text-xs font-medium text-mountain-600 mb-1.5">
                Sport
              </label>
              <div className="flex gap-1.5">
                <FilterButton
                  label="All"
                  active={filters.sport === "all"}
                  onClick={() => updateFilter("sport", "all")}
                />
                <FilterButton
                  label="Ski"
                  active={filters.sport === "ski"}
                  onClick={() => updateFilter("sport", "ski")}
                />
                <FilterButton
                  label="Snowboard"
                  active={filters.sport === "snowboard"}
                  onClick={() => updateFilter("sport", "snowboard")}
                />
              </div>
            </div>

            {/* Language filter */}
            <div>
              <label className="block text-xs font-medium text-mountain-600 mb-1.5">
                Language
              </label>
              <div className="flex flex-wrap gap-1.5">
                <FilterButton
                  label="All"
                  active={filters.language === "all"}
                  onClick={() => updateFilter("language", "all")}
                />
                {allLanguages.map((lang) => (
                  <FilterButton
                    key={lang}
                    label={lang}
                    active={filters.language === lang}
                    onClick={() => updateFilter("language", lang)}
                  />
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={() => setFilters(initialFilters)}
                className="self-end rounded-lg px-3 py-1.5 text-sm text-snow-300 hover:text-ice transition-colors"
              >
                Clear filters ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-sm text-mountain-600">
            {filtered.length} instructor{filtered.length !== 1 ? "s" : ""} found
          </p>

          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-mountain-800/30 py-16 text-center">
              <p className="text-lg text-snow-300">
                No instructors match your filters.
              </p>
              <button
                onClick={() => setFilters(initialFilters)}
                className="mt-3 text-sm font-medium text-ice hover:text-ice-light transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
