# LawIQ

**Know what you're owed. Put it in writing.**

LawIQ is an employment rights tool that helps people who've been laid off understand what they're legally entitled to — and generate a firm, professional demand letter to send directly to HR or Legal. No attorney required.

![LawIQ screenshot](https://lawiq.app/og.png)

## What It Does

1. **Intake wizard** — User enters employment details, severance/benefits offered, wage concerns, and their account of what happened (5 steps, ~5 min)
2. **Entitlement calculation** — LawIQ calculates expected severance (1 week/year), benefits continuation, flags ADEA (age ≥ 40) and WARN Act applicability
3. **Demand letter generation** — AI writes a professional demand letter referencing applicable law (ADEA, WARN Act, state wage/hour) and demanding resolution in 10 business days

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Auth | Clerk |
| Database | PostgreSQL via Drizzle ORM |
| AI | OpenRouter → `anthropic/claude-sonnet-4-5` |
| Deployment | Vercel |
| Fonts | Cormorant (display) + Figtree (UI) |

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` with:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/cases/new

# Postgres (Neon or any PG provider)
DATABASE_URL=postgresql://...          # pooled, for app
DATABASE_URL_UNPOOLED=postgresql://... # direct, for migrations

# OpenRouter
OPENROUTER_API_KEY=sk-or-...
```

## Database

```bash
# Push schema to database (first time or after schema changes)
npm run db:push
```

Schema is defined in `src/db/schema.ts` — a single `lawiq_cases` table.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── dashboard/page.tsx          # Case list
│   ├── cases/new/page.tsx          # Intake wizard
│   ├── cases/[id]/page.tsx         # Case detail + demand letter
│   └── api/cases/                  # REST + streaming endpoints
├── components/
│   ├── landing/                    # Hero, HowItWorks, UseCases
│   ├── intake/                     # WizardShell + 5 step components
│   ├── dashboard/CaseCard.tsx
│   └── case/                       # DemandEmailDisplay, CaseSidebar
├── db/                             # Drizzle client + schema
└── lib/                            # calculations, prompts, openrouter
```

## Deployment

Deployed to [lawiq.app](https://lawiq.app) via Vercel. Push to `main` auto-deploys.

```bash
git push origin main
```

## Legal Disclaimer

LawIQ provides information and tools, not legal advice. For complex situations, consult a licensed attorney.
