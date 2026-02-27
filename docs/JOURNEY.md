# SnowPro Armenia — Build Journey

## What Was Built

A fully functional MVP website for booking ski and snowboard instructors at Armenian resorts, deployed at **https://sanatruk.github.io/snowpro-armenia/**

### Pages Delivered
- **Home** — Hero, resort cards, featured instructors, how-it-works, CTA
- **Resort detail pages** — Tsaghkadzor, MyLer, Jermuk (with stats, features, instructors)
- **Instructors** — Filterable grid (by resort, sport, language) with direct WhatsApp/Telegram booking
- **About** — Platform story, instructor recruitment, 8-question FAQ, contact section

### Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4
- Static export (zero backend, zero cost)
- GitHub Pages hosting

---

## Interesting Findings

### Market Research (via Explorer agent)
- Armenia has exactly 3 ski resorts: Tsaghkadzor (Soviet-era, 30km), MyLer (opened 2021, 21km), Jermuk (3km spa town)
- **Zero** dedicated instructor booking platforms exist in Armenia
- All booking is fragmented: phone calls, Instagram DMs, WhatsApp numbers
- International platforms (GetExperience, GetYourGuide) have ~2-3 Armenian listings total
- MyLer has full artificial snowmaking — more reliable season than Tsaghkadzor
- Instructor rates: 10,000-20,000 AMD/hr (~$25-50 USD)

### What "MyLer" Actually Is
- User called it "Myler" — it's officially "MyLer Mountain Resort" with mixed casing
- Opened ~2021 near Aparan, Aragatsotn Province
- Rated #1 ski resort in Armenia on skiresort.info
- Has 10-seater gondolas, Olympic ice rink, helicopter tours
- This is genuinely the most modern ski infrastructure in the region

---

## Failures & Obstacles

### 1. Vercel Deployment — Blocked (No Auth)
**What happened:** Vercel CLI requires interactive login (`vercel login`). No pre-existing credentials.
**Impact:** ~10 minutes wasted trying Vercel, Netlify, surge.sh — all need auth.
**Resolution:** Switched to GitHub Pages (already authenticated via `gh` CLI).
**Lesson:** For autonomous agents, deployment platforms that support API-based auth (tokens via env vars) are essential. Vercel/Netlify's interactive login flow is hostile to automation.

### 2. GitHub Workflow Push — Blocked (Token Scope)
**What happened:** `gh` CLI token has `repo` scope but NOT `workflow` scope. GitHub rejects pushing `.github/workflows/` files.
**Impact:** Can't set up CI/CD via git push OR GitHub Contents API (both need `workflow` scope).
**Resolution:** Used the classic gh-pages branch approach instead of GitHub Actions-based deployment.
**Lesson:** The `workflow` scope is a separate permission from `repo`. If an autonomous agent needs to create CI/CD, it needs this scope pre-configured.

### 3. GitHub Pages Deployment API — Not Usable Externally
**What happened:** Tried using `POST /repos/{owner}/{repo}/pages/deployments` to upload static files directly.
**Impact:** API requires an `artifact_url` pointing to a GitHub Actions artifact — it's designed exclusively for workflow-based deployments, not external uploads.
**Resolution:** Fell back to the legacy gh-pages branch approach.
**Lesson:** GitHub's "modern" Pages deployment API is tightly coupled to Actions. The old gh-pages branch method is actually more automation-friendly for external tools.

### 4. SSH Key Not Configured
**What happened:** Initial `gh repo create --push` failed with SSH key error.
**Resolution:** Switched remote URL from SSH to HTTPS. Pushed successfully.
**Lesson:** Verify git protocol (SSH vs HTTPS) matches available credentials before pushing.

### 5. Orphan Branch Cleanup
**What happened:** First gh-pages attempt was interrupted. Directory got polluted with static files mixed into source tree.
**Resolution:** Checkout back to main, careful cleanup of stray files, then clean second attempt.
**Lesson:** Orphan branch operations are messy — build artifacts should be in a temp directory, not the project root.

---

## Sanatruk Observations (for the meta-project)

### What Worked Well
1. **Explorer agent research** was excellent — deep, sourced, comprehensive Armenian ski resort data
2. **Zero-compilation build** — Next.js 16 + Tailwind 4 compiled first try with zero errors
3. **Static export** is perfect for MVPs — no backend, no database, no hosting cost
4. **GitHub API** for enabling Pages worked flawlessly

### What Needs Improvement for Autonomous Sanatruk Workflows
1. **Pre-configured deployment credentials** — agents need Vercel/Netlify tokens in env vars
2. **GitHub token needs `workflow` scope** — without it, agents can't create CI/CD
3. **Cross-agent handoff wasn't used** — this was a solo build, but ideally:
   - Explorer → market research (done)
   - Sales → feature scoping, copy writing
   - Architect → implementation (done)
   - Reviewer → code review before deploy
4. **No browser automation was available** — "Chrome access" wasn't actionable as an MCP tool
5. **Project routing** — Sanatruk would need `snowpro-armenia` added to `config/projects.json` for proper routing

### Timing
- Research: ~2 min (Explorer agent)
- Design/planning: ~3 min
- Implementation: ~10 min (all pages, components, data)
- Deployment troubleshooting: ~15 min (the bulk of the struggle)
- Total: ~30 min end-to-end

---

## What's Next (if this becomes a real product)
1. Real instructor photos (replace placeholder avatars)
2. Online booking with availability calendar
3. Stripe/local payment integration
4. Armenian and Russian translations
5. Instructor self-service dashboard
6. Reviews and ratings
7. Custom domain (snowpro.am)
8. SEO optimization for "ski instructor Armenia" keywords
