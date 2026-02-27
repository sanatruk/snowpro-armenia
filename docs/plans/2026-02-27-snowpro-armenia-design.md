# SnowPro Armenia — MVP Design

**Date:** 2026-02-27
**Type:** MVP Landing Site
**Stack:** Next.js 15 + Tailwind CSS + Vercel

## Problem

Armenia has 2 legitimate ski resorts (Tsaghkadzor + MyLer) with instructor programs, but zero online booking infrastructure. Discovery and booking is fragmented across phone calls, Instagram DMs, and WhatsApp messages. International platforms like GetExperience have 2-3 listings total.

## Solution

A beautiful, mobile-first marketing site that:
1. Showcases Armenian ski resorts (Tsaghkadzor, MyLer, Jermuk)
2. Lists instructor profiles with specialties, languages, and pricing
3. Provides direct booking via WhatsApp/Telegram deep links
4. Includes a general contact form for inquiries

## Architecture

Static Next.js site with zero backend dependencies:
- **Data:** JSON files for instructors and resorts (no database)
- **Forms:** Formspree or similar for contact form (no server)
- **Booking:** WhatsApp/Telegram deep links per instructor
- **Hosting:** Vercel free tier (auto-deploy on push)
- **Domain:** snowpro.am (aspirational) or Vercel subdomain for now

## Pages

### 1. Home (`/`)
- Hero with mountain imagery and tagline
- Quick resort overview cards (Tsaghkadzor, MyLer)
- Featured instructors carousel
- "How it works" 3-step section
- Season info banner
- CTA to browse instructors

### 2. Resorts (`/resorts/[slug]`)
- Resort detail page with:
  - Overview, elevation, trail stats
  - Lift information
  - Season/weather info
  - Available instructors at this resort
  - Getting there (from Yerevan)
  - Equipment rental info

### 3. Instructors (`/instructors`)
- Grid of instructor cards
- Filter by resort, sport (ski/snowboard), language
- Each card: photo, name, specialties, price, languages, rating placeholder

### 4. About (`/about`)
- About the platform
- FAQ section (season, pricing, what to bring, cancellation)
- Contact form

## Data Model

### Resort
```json
{
  "slug": "tsaghkadzor",
  "name": "Tsaghkadzor",
  "nameArm": "Ծաղdelays",
  "description": "...",
  "elevation": { "base": 1966, "peak": 2819 },
  "slopes": "30km",
  "lifts": 7,
  "season": "Dec-Apr",
  "location": { "lat": 40.5331, "lng": 44.7261 },
  "distanceFromYerevan": "60km",
  "features": ["Night skiing", "Ski school", "Equipment rental"],
  "image": "/resorts/tsaghkadzor.jpg"
}
```

### Instructor
```json
{
  "id": "instructor-1",
  "name": "Gor Hakobyan",
  "photo": "/instructors/gor.jpg",
  "bio": "...",
  "specialties": ["snowboard", "freestyle"],
  "level": ["beginner", "intermediate", "advanced"],
  "languages": ["Armenian", "English", "Russian"],
  "resorts": ["tsaghkadzor", "myler"],
  "pricePerHour": 15000,
  "currency": "AMD",
  "contact": {
    "whatsapp": "+37455...",
    "telegram": "@gor_snow"
  },
  "experience": "8 years"
}
```

## Design Direction

- Dark/moody mountain aesthetic with snow whites and deep blues
- High-contrast text for readability
- Armenian cultural touches (font choices, patterns)
- Hero images: real Armenian mountain photography
- Mobile-first, responsive breakpoints at sm/md/lg/xl

## Not In Scope (Future)
- User accounts, authentication
- Payment processing
- Availability calendars
- Reviews/ratings system
- Admin panel / CMS
- Multi-language (Armenian/Russian)
