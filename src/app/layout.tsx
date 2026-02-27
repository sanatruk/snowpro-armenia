import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SnowPro Armenia — Book Ski & Snowboard Instructors",
    template: "%s | SnowPro Armenia",
  },
  description:
    "Book professional ski and snowboard instructors at Armenia's best resorts — Tsaghkadzor, MyLer, and Jermuk. Direct booking, no middlemen.",
  keywords: [
    "ski instructor Armenia",
    "snowboard instructor Armenia",
    "Tsaghkadzor ski lessons",
    "MyLer snowboard",
    "Armenia skiing",
    "book ski instructor",
  ],
  openGraph: {
    title: "SnowPro Armenia — Book Ski & Snowboard Instructors",
    description:
      "Professional ski and snowboard instructors at Armenia's best mountain resorts.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-body noise-bg`}
      >
        <Navigation />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
