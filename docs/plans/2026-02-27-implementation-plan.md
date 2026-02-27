# Implementation Plan — SnowPro Armenia MVP

## Phase 1: Project Setup
1. Initialize Next.js 15 with App Router, TypeScript, Tailwind CSS
2. Set up project structure (components, data, lib, public)
3. Create data files (resorts.json, instructors.json)
4. Configure Tailwind theme (colors, fonts)

## Phase 2: Core Layout
1. Build root layout with navigation and footer
2. Create shared UI components (Button, Card, Badge, Container)
3. Set up responsive navigation (mobile hamburger)

## Phase 3: Home Page
1. Hero section with mountain background
2. Resort overview cards
3. Featured instructors section
4. "How it works" steps
5. Season info / CTA banner

## Phase 4: Resort Pages
1. Dynamic route `/resorts/[slug]`
2. Resort header with stats
3. Trail/lift information
4. Instructors at this resort
5. Getting there section

## Phase 5: Instructors Page
1. Instructor grid with cards
2. Filter controls (resort, sport, language)
3. WhatsApp/Telegram booking links per instructor

## Phase 6: About/Contact
1. About section
2. FAQ accordion
3. Contact form (Formspree integration)

## Phase 7: Polish & Deploy
1. SEO metadata, Open Graph tags
2. Performance optimization (images, fonts)
3. Deploy to Vercel
4. Verify all pages and links
