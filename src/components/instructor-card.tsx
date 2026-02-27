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

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-snow-300">
          {instructor.bio}
        </p>

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

        {/* Contact buttons */}
        <div className="mt-4 flex gap-2">
          {instructor.contact.whatsapp && (
            <a
              href={`https://wa.me/${instructor.contact.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600/20 px-3 py-2.5 text-sm font-medium text-green-400 transition-colors hover:bg-green-600/30"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
          )}
          {instructor.contact.telegram && (
            <a
              href={`https://t.me/${instructor.contact.telegram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500/20 px-3 py-2.5 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/30"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Telegram
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
