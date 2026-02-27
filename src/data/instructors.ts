export type Sport = "ski" | "snowboard" | "both";
export type Level = "beginner" | "intermediate" | "advanced" | "expert";
export type Language = "Armenian" | "English" | "Russian" | "French" | "German";

export type TeachingStyle =
  | "Patient"
  | "Technical"
  | "Fun"
  | "Encouraging"
  | "Progressive"
  | "Calm"
  | "High-Energy"
  | "Expert-Level"
  | "Beginner-Specialist"
  | "Family-Friendly"
  | "Local Knowledge"
  | "Freestyle"
  | "Freeride"
  | "Carving";

export interface Instructor {
  readonly id: string;
  readonly name: string;
  readonly photo: string;
  readonly headline: string;
  readonly bio: string;
  readonly teachingStyle: readonly TeachingStyle[];
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
    headline:
      "From first turns to park tricks — competitive rider, patient teacher",
    bio: "Gor competed on the Armenian snowboard circuit before switching to instruction 8 years ago. He specializes in freestyle and freeride — whether you're strapping in for the first time or ready to hit the terrain park, he'll get you there. Students consistently highlight his patience and the fact that he makes every session fun, even when you're falling.",
    teachingStyle: ["Patient", "Fun", "Progressive"],
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
    headline: "Calm, encouraging, and great with nervous beginners",
    bio: "Anna has been teaching skiing for 6 years and is one of Armenia's few female instructors. She has a gift for putting nervous beginners at ease — her calm, step-by-step approach means you'll be making turns by the end of your first lesson. She also runs women-only group sessions on request.",
    teachingStyle: ["Calm", "Encouraging", "Beginner-Specialist"],
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
    headline:
      "MyLer's most experienced instructor — advanced technique & carving",
    bio: "Arman has been at MyLer since the resort opened and has 12 years of instruction under his belt. He knows every run, every shortcut, and every secret stash on the mountain. If you already ski or ride confidently and want to sharpen your carving, tackle steeper terrain, or refine your technique, Arman is your pick.",
    teachingStyle: ["Technical", "Expert-Level", "Local Knowledge"],
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
    headline: "The go-to instructor for families with young kids",
    bio: "With a background in physical education and 10 years teaching on Armenian slopes, Tigran turns first-time family ski trips into memories. Kids love him because he makes learning feel like a game. Parents love him because he's safety-focused and endlessly patient.",
    teachingStyle: ["Patient", "Fun", "Family-Friendly"],
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
    headline: "Multilingual snowboard guide — perfect for visiting tourists",
    bio: "Lilit discovered snowboarding on a trip to Austria and brought her passion back to Armenia. She teaches at both major resorts and is the top pick for international visitors — fluent in English, German, Russian, and Armenian. She specializes in getting beginners comfortable on a board.",
    teachingStyle: ["Encouraging", "Progressive", "Beginner-Specialist"],
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
    headline: "Former national team — race-level technique and speed coaching",
    bio: "Davit spent years on the Armenian national ski team before transitioning to coaching. With 15 years of experience, he's the instructor for advanced skiers who want race-level technique, speed training, and mogul mastery. If you're already confident on blacks and want to go faster, Davit is your coach.",
    teachingStyle: ["Technical", "High-Energy", "Expert-Level"],
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

export function getInstructorsByResort(
  resortSlug: string,
): readonly Instructor[] {
  return instructors.filter((i) => i.resorts.includes(resortSlug));
}

export function getFeaturedInstructors(): readonly Instructor[] {
  return instructors.filter((i) => i.featured);
}

export function getInstructorById(id: string): Instructor | undefined {
  return instructors.find((i) => i.id === id);
}
