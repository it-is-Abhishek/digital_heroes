# Digital Heroes PRD Mapping

This codebase implements a polished demo of the assignment brief using `Next.js 16`, TypeScript, and a local seeded data layer.

## Covered Product Surfaces

- Public marketing landing page with charity-first messaging and subscription CTA
- Charity directory page with featured organizations and event metadata
- Subscriber dashboard showing plan state, latest five scores, draw participation, and verification state
- Admin dashboard covering draw simulation, prize pool visibility, winner review, and charity management summaries
- Demo auth handoff page with reviewer credentials

## Core Rules Represented In Code

- Last five golf scores retained only: `retainLatestScores` in [src/lib/logic.ts](/Users/abhishek/Desktop/digital_heroes/src/lib/logic.ts)
- Prize pool splits and charity allocation: `calculatePrizePool` in [src/lib/logic.ts](/Users/abhishek/Desktop/digital_heroes/src/lib/logic.ts)
- Admin-facing draw preview, entrant matching, and payout queue: [src/lib/data.ts](/Users/abhishek/Desktop/digital_heroes/src/lib/data.ts)

## Production Handoff

- Replace the seeded data layer with Supabase tables for users, subscriptions, scores, charities, draws, winners, and payouts
- Wire `auth` to Supabase Auth and subscription checkout to Stripe
- Persist draw simulations and published results through server actions or route handlers
- Deploy to a fresh Vercel account and connect to a new Supabase project per the assignment constraints
