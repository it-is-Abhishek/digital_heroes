import Link from "next/link";

import { getPlanPriceId, isStripeConfigured } from "@/lib/payments";
import {
  getSubscriptionPlan,
  subscriptionPlans,
  type PlanId,
} from "@/lib/plans";

type SubscribePageProps = {
  searchParams: Promise<{
    plan?: string;
  }>;
};

const planOrder: PlanId[] = ["monthly", "yearly"];

export default async function SubscribePage({
  searchParams,
}: SubscribePageProps) {
  const { plan: requestedPlan } = await searchParams;
  const selectedPlan =
    getSubscriptionPlan(requestedPlan) ?? subscriptionPlans.monthly;
  const stripeReady = isStripeConfigured();
  const hasPriceId = Boolean(getPlanPriceId(selectedPlan.id));

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 sm:px-10">
      <section className="glass-panel rounded-[2.4rem] p-8">
        <p className="section-label">Subscribe</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
          Choose a plan, then pay.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
          This page is simple. First pick your plan. Then enter your email and pay.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {planOrder.map((planId) => {
            const plan = subscriptionPlans[planId];
            const active = plan.id === selectedPlan.id;

            return (
              <article
                key={plan.id}
                className={`rounded-[2rem] p-6 ${active ? "feature-card" : "bg-white/75"}`}
              >
                <p className="section-label">{plan.name}</p>
                <h2 className="mt-3 text-4xl font-semibold text-[var(--color-ink)]">
                  ${plan.amount}
                  <span className="text-lg font-normal text-[var(--color-muted)]">
                    {" "}
                    / {plan.interval}
                  </span>
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {plan.description}
                </p>
                <Link
                  href={`/subscribe?plan=${plan.id}`}
                  className={`pill-button mt-6 ${active ? "pill-button-primary" : ""}`}
                >
                  {active ? "This is your plan" : "Pick this plan"}
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <section className="feature-card rounded-[2rem] p-6">
            <p className="section-label">Payment</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
              {stripeReady ? "Payment is ready" : "Demo payment is ready"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {stripeReady
                ? "Enter your email and tap the big button."
                : "Stripe is not connected, so you can test the demo payment screen."}
            </p>

            {stripeReady ? (
              <form action="/api/checkout" method="POST" className="mt-6 space-y-4">
                <input type="hidden" name="planId" value={selectedPlan.id} />
                <div>
                  <label
                    htmlFor="customerEmail"
                    className="text-sm font-medium text-[var(--color-ink)]"
                  >
                    Your email
                  </label>
                  <input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none"
                    required
                  />
                </div>
                <button type="submit" className="pill-button pill-button-primary">
                  Pay now
                </button>
              </form>
            ) : (
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/checkout/success?demo=1&plan=${selectedPlan.id}`}
                  className="pill-button pill-button-primary"
                >
                  Open demo payment
                </Link>
                <Link href="/" className="pill-button">
                  Go back
                </Link>
              </div>
            )}

            {stripeReady ? (
              <div className="mt-6 rounded-[1.4rem] bg-white/80 px-4 py-4 text-sm leading-7 text-[var(--color-muted)]">
                Test card: <strong>4242 4242 4242 4242</strong>
              </div>
            ) : null}
          </section>

          <section className="glass-panel rounded-[2rem] p-6">
            <p className="section-label">Quick view</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              <div className="rounded-[1.4rem] bg-white/80 px-4 py-4">
                <p className="font-medium text-[var(--color-ink)]">Your plan</p>
                <p className="mt-1">{selectedPlan.name}</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/80 px-4 py-4">
                <p className="font-medium text-[var(--color-ink)]">Real payment</p>
                <p className="mt-1">{stripeReady ? "On" : "Off"}</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/80 px-4 py-4">
                <p className="font-medium text-[var(--color-ink)]">Saved plan price</p>
                <p className="mt-1">
                  {hasPriceId ? "Ready" : "Using demo app price"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
