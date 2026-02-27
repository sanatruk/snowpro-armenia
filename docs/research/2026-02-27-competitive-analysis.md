# Ski Instructor Booking Platforms — Competitive Analysis

- Date: 2026-02-27
- Agent: @explorer
- Depth: thorough

## Summary

Analyzed 3 major ski instructor booking platforms (Maison Sport, CheckYeti, SkiBro) plus the broader SaaS booking tool landscape. "DoLessons" could not be found — likely doesn't exist or is too small to index. The market has converged on a clear pattern: rich instructor profiles + instant booking + upfront payment + verified reviews. For SnowPro Armenia's Plan B upgrade, the top 5 features are: online booking with calendar, Stripe payments with deposits, review/rating system, instructor profiles with media, and in-app messaging.

---

## Platform Breakdown

### 1. Maison Sport (maisonsport.com) — Market Leader

**Scale:** 1,300+ instructors, 430+ resorts, 10 European countries

**Booking Flow:**
- Search by resort → filter by rating, skill, price, specialism
- Rich instructor profiles with reviews, qualifications, languages
- Direct messaging with instructor before booking
- "Book Now" with 20% refundable deposit (30+ days in advance)
- Full payment due 24 days before lesson

**Revenue Model:**
- Platform takes 12.5-17% commission (varies by booking size)
- Instructors keep ~93% of lesson cost (after their subscription)
- 5 instructor subscription tiers: Lite, Pro, Part-time, Basic, Ultimate
- Subscription deductible from first earnings (no upfront cost)
- Customer-facing: Club Maison Sport — £21/year membership for discounts

**Trust Signals:**
- 90%+ of reviews are 5-star
- All instructors vetted and verified
- Expert customer service team

**Key UX Patterns:**
- Transparent pricing on homepage (from €50/hr private ski)
- Instructor-first browsing (profiles are the product)
- Pre-booking messaging (reduces anxiety, builds trust)
- Flexible cancellation (full refund 21+ days before)

**What's Working:** Deposit model reduces no-shows while lowering commitment barrier. Instructor messaging before payment builds trust. High instructor retention (93% earnings) creates supply-side flywheel.

---

### 2. CheckYeti (checkyeti.com) — Largest by Volume

**Scale:** 16,000+ activities, 1,500+ destinations, 500+ ski resorts, 1.5M+ users

**Booking Flow:**
- Select ski region + date on homepage
- Browse all available offers with filters
- View lesson cards with pricing, details
- Enter personal data → instant confirmation by email
- "No additional booking fees" to customer

**Revenue Model:**
- Commission from ski schools/instructors (exact % undisclosed)
- Small service fee to customers (~€6 on some bookings)
- Tiered service fee based on cart total: 45% low, 35% mid, 20% high
- Strategic partnership with Skiset (equipment rental cross-sell)

**Trust Signals:**
- 4.4 Trustpilot rating (1,496 reviews, 79% 5-star)
- Works only with certified schools and qualified instructors
- Instant booking confirmation

**Key UX Patterns:**
- Activity-first (not instructor-first) — you pick a lesson type, not a person
- Date-driven search (start with when, not who)
- Early bird discounts, group discounts, seasonal promos
- Cross-sell: lessons + equipment rental in one cart

**Issues Found:**
- "Free cancellation" messaging criticized as misleading
- Charges card immediately, reveals it's a "request" only after
- Refund timing depends on bank processing

**What's Working:** Volume play — more activities, more destinations, more reasons to return. Cross-selling equipment rental alongside lessons adds revenue per transaction.

---

### 3. SkiBro (skibro.com) — Best UX Innovation

**Scale:** Major alpine resorts in France, Austria, Switzerland

**Booking Flow:**
- Browse instructors with video profiles + reviews
- Filter by specialization, availability, price
- Real-time availability, instant booking
- Choose lesson length, time, meeting point
- Last-minute booking supported

**Revenue Model:**
- Commission-based (exact rate undisclosed)
- Instructors set own prices in real-time

**Key UX Innovations:**
- **Video profiles** for every instructor — who they are, specialization, teaching philosophy
- **In-app GPS navigation** to find your instructor on the mountain
- **Real-time pricing** set by instructors
- **Flexible meeting points** — meet wherever suits you

**Trust Signals:**
- Detailed instructor bios + customer reviews
- Video reduces "stranger anxiety"
- Real-time availability (no ghost bookings)

**Critical Warning (2025-2026):**
- Multiple Trustpilot reports of **instructors not being paid**
- Payment processing issues throughout the season
- Platform reliability concerns

**What's Working (UX-wise):** Video profiles are a killer differentiator — they humanize instructors and dramatically reduce booking anxiety. GPS meetup solves a real pain point (finding your instructor at a crowded resort base). Real-time availability prevents frustration.

---

## Feature Comparison Matrix

| Feature | Maison Sport | CheckYeti | SkiBro | SnowPro (Current) |
|---------|-------------|-----------|--------|-------------------|
| Online booking | Yes | Yes | Yes | No (WhatsApp) |
| Payment processing | Yes (deposit) | Yes (full) | Yes | No |
| Instructor profiles | Rich | Basic | Rich + Video | Basic |
| Review/rating system | Yes (verified) | Yes | Yes | No |
| Calendar/availability | Yes | Yes | Real-time | No |
| In-app messaging | Yes | Yes | Yes + GPS | No (external) |
| Search filters | Resort, skill, price, specialism | Region, date, type | Specialization, availability | Resort only |
| Cancellation policy | Flexible (21-day full refund) | Varies | Flexible | N/A |
| Group lessons | Yes | Yes | Yes | No |
| Equipment rental | Partner (Skiset) | Partner (Skiset) | No | No |
| Mobile app | Instructor app | Customer app | Customer + instructor | No |
| Membership/loyalty | £21/yr club | No | No | No |
| Multi-language | Yes | Yes | Yes | ARM/EN/RU |
| Instructor onboarding | Subscription tiers | School-based | Self-serve + video shoot | Manual |

---

## Top 5 Features for Armenian Market MVP

Ranked by impact-to-effort ratio, considering the Armenian context (small market, 3 resorts, ~20 potential instructors, price-sensitive tourists + locals):

### 1. Online Booking with Calendar (CRITICAL)

**Why:** The single biggest gap. WhatsApp booking creates friction, has no confirmation, no record, no accountability. Every competitor has this. It's table stakes.

**What to build:**
- Instructor availability calendar (weekly recurring slots + manual overrides)
- Date/time picker on instructor profile
- Booking confirmation with details (instructor, resort, time, meeting point)
- Automated email/SMS confirmation

**Pattern from competitors:** Maison Sport keeps it simple — select lesson type, pick time, book. Don't over-engineer.

**Armenian context:** Tsaghkadzor is 50 min from Yerevan — people often decide same-day or day-before. Support last-minute booking like SkiBro.

### 2. Stripe Payment with Deposit Option (CRITICAL)

**Why:** No payment = no commitment = no-shows. Upfront payment also enables the platform to take a commission (your revenue model).

**What to build:**
- Stripe Connect for instructor payouts (each instructor = connected account)
- Two modes: full prepay OR 20% deposit (configurable per instructor)
- Automatic payout to instructor after lesson completion
- Cancellation refund logic (e.g., full refund 48h before, 50% within 48h)

**Pattern from competitors:** Maison Sport's 20% deposit model is ideal — low commitment barrier but enough skin in the game. CheckYeti's "charge first, explain later" approach generates complaints.

**Armenian context:** AMD pricing. Consider supporting local payment methods alongside Stripe (Ameria/ACBA cards work with Stripe). Instructors price 10,000-18,000 AMD/hr (~$25-45) — deposits would be 2,000-3,600 AMD.

### 3. Review & Rating System (HIGH IMPACT)

**Why:** Reviews are the #1 trust signal on every competitor platform. Maison Sport's 90%+ 5-star rate is their biggest selling point. Without reviews, users can't distinguish between instructors.

**What to build:**
- Post-lesson review prompt (email/SMS 2 hours after lesson ends)
- 5-star rating + text review
- Verified-only reviews (must have completed a booking)
- Display aggregate rating + review count on instructor card
- Instructor can respond to reviews

**Pattern from competitors:** Maison Sport keeps reviews simple — star rating + text. No complex rubrics. SkiBro ties reviews to instructor profiles seamlessly.

**Armenian context:** Start with seeded reviews from existing WhatsApp clients (ask them to submit). With 6 instructors, even 3-5 reviews each creates meaningful differentiation.

### 4. Rich Instructor Profiles with Media (HIGH IMPACT)

**Why:** SkiBro's video profiles are their strongest differentiator. Instructor profiles are the product — they're what users browse, compare, and choose from.

**What to build:**
- Photo gallery (action shots on slopes + portrait)
- Short video intro (30-60 sec, self-recorded is fine)
- Structured fields: experience years, certifications, languages, specialties, teaching style
- Pricing displayed prominently
- "About me" narrative section
- Resort assignment(s)

**Pattern from competitors:** SkiBro shoots professional videos. For MVP, self-recorded phone videos are fine — authenticity matters more than production value in a small market.

**Armenian context:** Multilingual is key — Armenian tourists + Russian tourists + growing Western tourism. Each instructor should list AM/RU/EN capability prominently.

### 5. In-Platform Messaging (MEDIUM IMPACT)

**Why:** Maison Sport's pre-booking messaging is a trust-builder. Users want to ask questions before committing money. Currently this happens on WhatsApp — moving it in-platform keeps users on your site, builds data, and enables future automation.

**What to build:**
- Simple chat between user and instructor (thread per booking inquiry)
- Push notification to instructor (email or Telegram webhook for MVP)
- Pre-booking: open messaging on any instructor profile
- Post-booking: conversation continues with meeting point coordination
- Basic message templates ("Hi, I'd like to book a lesson on [date]...")

**Pattern from competitors:** Maison Sport and SkiBro both support pre-booking messaging. CheckYeti is more transactional (less messaging).

**Armenian context:** Keep WhatsApp/Telegram as notification channels for instructors (they're already using them). In-platform messaging for the customer side, notification relay to instructor's preferred channel.

---

## Honorable Mentions (Phase 2)

These features matter but aren't MVP-critical:

| Feature | Rationale | When |
|---------|-----------|------|
| Group lesson booking | Currently only private. Group lessons expand market | After MVP stabilizes |
| Equipment rental cross-sell | Partner with local rental shops in Tsaghkadzor | Season 2 |
| Membership/loyalty program | Too early with small user base | 1000+ bookings |
| GPS instructor finder | Cool but overkill for 3 small resorts | Maybe never |
| Instructor mobile app | Portal for managing availability, viewing bookings | Phase 2 |
| Multi-resort packages | Bundle Tsaghkadzor + Jermuk trips | When demand proves it |

---

## Revenue Model Recommendation

Based on competitor analysis, for Armenian market:

| Model | Maison Sport | CheckYeti | Recommended for SnowPro |
|-------|-------------|-----------|------------------------|
| Instructor commission | 12.5-17% | ~commission-based | **10-15%** (lower to attract supply in small market) |
| Customer booking fee | None (club optional) | ~€6 service fee | **None** (remove friction) |
| Instructor subscription | €49-199/season | None | **None** (too few instructors to tier) |
| Deposit model | 20% deposit | Full prepay | **20% deposit** (follow Maison Sport) |

**Start with 10% platform commission, no fees to customers.** At AMD 15,000/hr average, that's AMD 1,500/lesson (~$3.75). With 6 instructors doing ~5 lessons/week over a 12-week season, that's ~360 lessons = ~AMD 540,000 (~$1,350) per season. Revenue grows with instructor count and booking volume.

---

## UX Patterns That Drive Bookings

From analyzing all three platforms, these patterns consistently drive conversion:

1. **Instructor-first browsing** — Users want to pick a person, not a time slot. Lead with faces and profiles.
2. **Transparent pricing on listings** — Show price per hour on every card. No "contact for pricing."
3. **Low-commitment entry** — Deposit model + free cancellation window reduces decision anxiety.
4. **Social proof on every card** — Star rating + review count visible without clicking into profile.
5. **Pre-booking communication** — Let users message before paying. Builds trust, reduces refunds.
6. **Simple search flow** — Resort → Date → Browse instructors. Maximum 3 clicks to reach bookable profiles.
7. **Mobile-first** — Most ski bookings happen on phones (on the slopes, in hotel).

---

## Gaps in Research

- **DoLessons**: Could not find this platform. Searched exact name, variations. Likely doesn't exist as a major player, or may be known by a different name.
- **SkiBro financials**: Commission rate undisclosed. Platform is experiencing payment issues to instructors (2025-2026 season) — may be in financial trouble.
- **CheckYeti exact commission**: Not publicly disclosed. Estimated from indirect sources.
- **Armenian competitor landscape**: No direct competitors found doing online ski instructor booking in Armenia. This is greenfield.

## Sources

- [Maison Sport](https://maisonsport.com/en)
- [Maison Sport — Snow Magazine Profile](https://www.snowmagazine.com/features/focus-on/maison-sport-your-mountain-your-instructor-your-way)
- [Maison Sport — Club Membership Launch](https://www.edinburghnews.scotsman.com/community/ski-booking-platform-co-founded-by-edinburgh-entrepreneur-launches-annual-membership-club-5494117)
- [Maison Sport — Record Season](https://travel-news.co.uk/business/maison-sport-reports-record-season-as-ski-travellers-embrace-digital-and-personalised-experiences/34775/)
- [Maison Sport — Instructor Subscription Tiers](https://maisonsport.com/en/blog/introducing-our-new-subscription-tiers)
- [Maison Sport — Trustpilot](https://www.trustpilot.com/review/maisonsport.com)
- [CheckYeti](https://www.checkyeti.com/)
- [CheckYeti — Snow Forecast Profile](https://www.snow-forecast.com/whiteroom/checkyeti-the-no-1-for-ski-school-booking/)
- [CheckYeti — Skiset Partnership](https://www.inthesnow.com/checkyeti-success-skiset-partnership/)
- [CheckYeti — Trustpilot](https://www.trustpilot.com/review/checkyeti.com)
- [SkiBro](https://skibro.com/en)
- [SkiBro — 9 Ways Changing the Game](https://www.snowmagazine.com/features/focus-on/9-ways-skibro-is-changing-the-ski-tuition-game)
- [SkiBro — InTheSnow Profile](https://www.inthesnow.com/skibro-changing-the-ski-tuition-booking-game-for-good/)
- [SkiBro — Trustpilot](https://www.trustpilot.com/review/www.skibro.com)
- [Platform Comparison — LinkedIn](https://www.linkedin.com/pulse/should-i-book-my-ski-lessons-booking-platform-like-check-davies)
- [Armenian Ski Resorts — armenia.travel](https://armenia.travel/articles/skiing-in-armenia-unveiling-adventure-on-snow-capped-peaks/)
- [Tsaghkadzor — NearFar Magazine](https://nearfarmag.com/tsaghkadzor-ski-resort-armenia/)

## Confidence

**High** — All three platforms are well-documented with public pricing, reviews, and press coverage. Armenian market context is confirmed through tourism sites and the live MVP. The only gap is "DoLessons" which appears to not exist as a significant platform.
