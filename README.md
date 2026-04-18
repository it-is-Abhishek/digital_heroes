# Digital Heroes

Assignment implementation for a subscription-led golf platform that combines:

- Stableford score tracking with latest-5 retention
- Monthly draw and prize pool logic
- Charity allocation per subscriber
- Subscriber dashboard and admin operations view

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS v4
- Local seeded data layer designed to be swapped with Supabase

## Pages

- `/` marketing landing page
- `/auth` demo reviewer login handoff
- `/charities` charity directory
- `/dashboard` subscriber experience
- `/admin` admin operations dashboard

## Demo Credentials

- Subscriber: `amelia@digitalheroes.demo` / `DemoPass!2026`
- Admin: `admin@digitalheroes.demo` / `AdminPass!2026`

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Handoff

Copy `.env.example` to `.env.local` and configure:

- Supabase project keys
- Stripe keys
- Stripe webhook secret
- Stripe price IDs for monthly and yearly plans
- `NEXT_PUBLIC_APP_URL` for success and cancel redirects

## Stripe Checkout

The payment gateway is implemented with hosted Stripe Checkout.

- `POST /api/checkout` creates a Stripe Checkout Session in `subscription` mode
- `/api/checkout?planId=monthly|yearly` also works for direct plan buttons
- The homepage pricing cards and `/auth` page both submit directly into checkout
- `/checkout/success` shows the completed session summary
- `/checkout/cancel` handles user cancellation and config errors
- `/api/stripe/webhook` verifies Stripe webhook signatures for subscription events

If `STRIPE_MONTHLY_PRICE_ID` and `STRIPE_YEARLY_PRICE_ID` are not set, the app falls back to inline recurring price data using the current demo prices.

## Testing Stripe

1. Add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_APP_URL` to `.env.local`
2. Start the app with `npm run dev`
3. Open `/subscribe`
4. Enter an email and continue to Stripe payment
5. Use Stripe test card `4242 4242 4242 4242`

## Production Notes

The current build uses seeded in-memory data so the assignment can be reviewed immediately without external credentials. The domain rules and UI surfaces are already structured for a production swap to:

- Supabase Auth
- Supabase Postgres tables
- Stripe Checkout and webhooks
- Vercel deployment

The requirement mapping is documented in [docs/PRD-MAPPING.md](/Users/abhishek/Desktop/digital_heroes/docs/PRD-MAPPING.md).
# digital_heroes
