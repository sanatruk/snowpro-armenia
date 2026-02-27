export type Sport = "ski" | "snowboard" | "both";
export type Level = "beginner" | "intermediate" | "advanced" | "expert";
export type Language = "Armenian" | "English" | "Russian" | "French" | "German";

export interface Instructor {
  readonly id: string;
  readonly name: string;
  readonly photo: string;
  readonly bio: string;
  readonly sport: Sport;
  readonly specialties: readonly string[];
  readonly levels: readonly Level[];
  readonly languages: readonly Language[];
  readonly resorts: readonly string[];
  readonly pricePerHour: number;
  readonly currency: "AMD";
  readonly priceUSD: string;
  readonly contact: {
    readonly whatsapp?: string;
    readonly telegram?: string;
  };
  readonly experience: string;
  readonly certifications?: readonly string[];
  readonly featured?: boolean;
}

export const instructors: readonly Instructor[] = [
  {
    id: "gor-hakobyan",
    name: "Gor Hakobyan",
    photo: "/instructors/gor.jpg",
    bio: "Former competitive snowboarder turned instructor. Gor specializes in freestyle and freeride, taking riders from their first turns to hitting the park. Known for his patient teaching style and infectious enthusiasm.",
    sport: "snowboard",
    specialties: ["Freestyle", "Freeride", "Park riding"],
    levels: ["beginner", "intermediate", "advanced"],
    languages: ["Armenian", "English", "Russian"],
    resorts: ["tsaghkadzor", "myler"],
    pricePerHour: 15000,
    currency: "AMD",
    priceUSD: "~$38",
    contact: {
      whatsapp: "+37455123456",
      telegram: "@gor_rides",
    },
    experience: "8 years",
    certifications: ["ISIA Level 2"],
    featured: true,
  },
  {
    id: "anna-sargsyan",
    name: "Anna Sargsyan",
    photo: "/instructors/anna.jpg",
    bio: "Anna is one of Armenia's few female ski instructors and a passionate advocate for getting more women on the slopes. She teaches all levels with a calm, encouraging approach that makes even the most nervous beginners feel at ease.",
    sport: "ski",
    specialties: ["Alpine skiing", "Women's clinics", "Children's lessons"],
    levels: ["beginner", "intermediate", "advanced"],
    languages: ["Armenian", "English", "French"],
    resorts: ["tsaghkadzor"],
    pricePerHour: 12000,
    currency: "AMD",
    priceUSD: "~$30",
    contact: {
      whatsapp: "+37477234567",
      telegram: "@anna_ski",
    },
    experience: "6 years",
    certifications: ["Armenian Ski Federation Level 1"],
    featured: true,
  },
  {
    id: "arman-gevorgyan",
    name: "Arman Gevorgyan",
    photo: "/instructors/arman.jpg",
    bio: "A MyLer local since the resort opened, Arman knows every run and secret spot on the mountain. He specializes in advanced technique and carving, helping experienced riders reach the next level.",
    sport: "both",
    specialties: ["Carving", "Advanced technique", "Off-piste"],
    levels: ["intermediate", "advanced", "expert"],
    languages: ["Armenian", "Russian", "English"],
    resorts: ["myler"],
    pricePerHour: 18000,
    currency: "AMD",
    priceUSD: "~$45",
    contact: {
      whatsapp: "+37491345678",
      telegram: "@arman_mountain",
    },
    experience: "12 years",
    certifications: ["ISIA Level 3", "Avalanche Safety"],
    featured: true,
  },
  {
    id: "tigran-avetisyan",
    name: "Tigran Avetisyan",
    photo: "/instructors/tigran.jpg",
    bio: "Tigran is the go-to instructor for families and children. With a background in physical education and a natural way with kids, he makes learning to ski feel like a game. Patient, fun, and safety-focused.",
    sport: "ski",
    specialties: ["Children's lessons", "Family groups", "First-timers"],
    levels: ["beginner", "intermediate"],
    languages: ["Armenian", "Russian"],
    resorts: ["tsaghkadzor", "jermuk"],
    pricePerHour: 10000,
    currency: "AMD",
    priceUSD: "~$25",
    contact: {
      whatsapp: "+37498456789",
    },
    experience: "10 years",
    featured: false,
  },
  {
    id: "lilit-manukyan",
    name: "Lilit Manukyan",
    photo: "/instructors/lilit.jpg",
    bio: "Lilit fell in love with snowboarding on a trip to Austria and brought her passion back to Armenia. She teaches at both major resorts and is especially popular with tourists thanks to her fluent English and German.",
    sport: "snowboard",
    specialties: ["Beginner snowboarding", "Tourism groups", "Carving"],
    levels: ["beginner", "intermediate"],
    languages: ["Armenian", "English", "German", "Russian"],
    resorts: ["tsaghkadzor", "myler"],
    pricePerHour: 13000,
    currency: "AMD",
    priceUSD: "~$33",
    contact: {
      whatsapp: "+37444567890",
      telegram: "@lilit_board",
    },
    experience: "5 years",
    featured: false,
  },
  {
    id: "davit-karapetyan",
    name: "Davit Karapetyan",
    photo: "/instructors/davit.jpg",
    bio: "Davit is a former Armenian national team member with over 15 years on the slopes. He now channels his competitive experience into coaching advanced skiers who want race-level technique and speed.",
    sport: "ski",
    specialties: ["Race technique", "Speed training", "Moguls"],
    levels: ["advanced", "expert"],
    languages: ["Armenian", "English", "Russian"],
    resorts: ["tsaghkadzor", "myler"],
    pricePerHour: 20000,
    currency: "AMD",
    priceUSD: "~$50",
    contact: {
      whatsapp: "+37493678901",
      telegram: "@davit_speed",
    },
    experience: "15 years",
    certifications: ["ISIA Level 3", "FIS Race Coach"],
    featured: false,
  },
] as const;

export function getInstructorsByResort(resortSlug: string): readonly Instructor[] {
  return instructors.filter((i) => i.resorts.includes(resortSlug));
}

export function getFeaturedInstructors(): readonly Instructor[] {
  return instructors.filter((i) => i.featured);
}

export function getInstructorById(id: string): Instructor | undefined {
  return instructors.find((i) => i.id === id);
}
