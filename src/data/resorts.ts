export interface Resort {
  readonly slug: string;
  readonly name: string;
  readonly nameArm: string;
  readonly tagline: string;
  readonly description: string;
  readonly elevation: { readonly base: number; readonly peak: number };
  readonly verticalDrop: number;
  readonly slopes: string;
  readonly lifts: number;
  readonly season: string;
  readonly distanceFromYerevan: string;
  readonly driveTime: string;
  readonly features: readonly string[];
  readonly liftTicketPrice: string;
  readonly equipmentRental: {
    readonly ski: string;
    readonly snowboard: string;
    readonly helmet: string;
  };
  readonly coordinates: { readonly lat: number; readonly lng: number };
  readonly image: string;
  readonly heroGradient: string;
}

export const resorts: readonly Resort[] = [
  {
    slug: "tsaghkadzor",
    name: "Tsaghkadzor",
    nameArm: "Ծաղկadzor",
    tagline:
      "Armenia's flagship resort — 30km of runs, 50 minutes from Yerevan",
    description:
      "The mountain every Armenian skier knows. Seven lifts serving everything from gentle nursery slopes to steep off-piste. Night skiing on weekends. The best instructor selection of any Armenian resort. Built during the Soviet era as an Olympic training base, with stunning views of Mount Ararat on clear days.",
    elevation: { base: 1966, peak: 2819 },
    verticalDrop: 853,
    slopes: "30km",
    lifts: 7,
    season: "Mid-December to April",
    distanceFromYerevan: "60km",
    driveTime: "~50 min",
    features: [
      "Ski school with 27 instructors",
      "Equipment rental on-site",
      "Night skiing (limited)",
      "Restaurants & cafes",
      "Hotels within walking distance",
      "Olympic training history",
    ],
    liftTicketPrice: "7,000–12,000 AMD (~$18–30)",
    equipmentRental: {
      ski: "5,000 AMD (~$13)",
      snowboard: "7,000 AMD (~$18)",
      helmet: "2,000 AMD (~$5)",
    },
    coordinates: { lat: 40.5331, lng: 44.7261 },
    image: "/resorts/tsaghkadzor.jpg",
    heroGradient: "from-blue-950 via-blue-900 to-slate-900",
  },
  {
    slug: "myler",
    name: "MyLer Mountain Resort",
    nameArm: "MailLer",
    tagline:
      "Armenia's newest resort — modern lifts, extended season, uncrowded runs",
    description:
      "Built to international standards with snowmaking that keeps runs open into April. Seven high-speed lifts, zero weekend crowds. The best-kept secret for riders who want quality without the queues. Opened in 2021 near Aparan, MyLer is rated #1 ski resort in Armenia with 10-seater gondolas, an Olympic-size ice rink, and helicopter tours.",
    elevation: { base: 1950, peak: 2850 },
    verticalDrop: 900,
    slopes: "21km",
    lifts: 7,
    season: "December to April (extended with artificial snow)",
    distanceFromYerevan: "80km",
    driveTime: "~1 hr 15 min",
    features: [
      "Artificial snowmaking (full coverage)",
      "10-seater gondolas",
      "Ski school",
      "4 restaurants",
      "Olympic-size ice rink",
      "Tubing zone",
      "Helicopter tours",
      "All 4 European difficulty levels",
    ],
    liftTicketPrice: "15,000 AMD (~$38)",
    equipmentRental: {
      ski: "8,000 AMD (~$20)",
      snowboard: "10,000 AMD (~$25)",
      helmet: "3,000 AMD (~$8)",
    },
    coordinates: { lat: 40.5833, lng: 44.3667 },
    image: "/resorts/myler.jpg",
    heroGradient: "from-indigo-950 via-purple-900 to-slate-900",
  },
  {
    slug: "jermuk",
    name: "Jermuk",
    nameArm: " Джерmuk",
    tagline:
      "Gentle slopes + legendary hot springs — the perfect first-timer destination",
    description:
      "Small, friendly, and zero intimidation factor. Three kilometers of wide-open beginner terrain, then hot springs to reward yourself after. Ideal for families with kids and adults trying skiing for the first time. Jermuk's legendary mineral thermal baths are just minutes from the slopes.",
    elevation: { base: 2100, peak: 2438 },
    verticalDrop: 338,
    slopes: "3km",
    lifts: 1,
    season: "January to March",
    distanceFromYerevan: "170km",
    driveTime: "~2 hr 30 min",
    features: [
      "Beginner-friendly slopes",
      "Mineral hot springs nearby",
      "Family-oriented",
      "Affordable prices",
      "Beautiful spa town",
    ],
    liftTicketPrice: "3,000 AMD (~$8)",
    equipmentRental: {
      ski: "3,000 AMD (~$8)",
      snowboard: "4,000 AMD (~$10)",
      helmet: "1,500 AMD (~$4)",
    },
    coordinates: { lat: 39.8422, lng: 45.6694 },
    image: "/resorts/jermuk.jpg",
    heroGradient: "from-teal-950 via-emerald-900 to-slate-900",
  },
] as const;

export function getResortBySlug(slug: string): Resort | undefined {
  return resorts.find((r) => r.slug === slug);
}
