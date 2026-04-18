import Link from "next/link";

import { CheckoutButton } from "@/components/checkout-button";

export default function AuthPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 sm:px-10">
      <div className="glass-panel rounded-[2.4rem] p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-mint-strong)]">
          Demo access
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
          Signup, login, and test account handoff.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
          This build uses demo credentials and seeded data so the reviewer can
          validate the user and admin journeys immediately. In production, these
          forms map directly to Supabase auth and subscription onboarding.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[1.8rem] bg-white/75 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-mint-strong)]">
              Subscriber login
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm text-[var(--color-muted)]">Email</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none"
                  defaultValue="amelia@digitalheroes.demo"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm text-[var(--color-muted)]">Password</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none"
                  defaultValue="DemoPass!2026"
                  readOnly
                />
              </div>
              <Link href="/dashboard" className="pill-button pill-button-primary w-full justify-center">
                Enter subscriber dashboard
              </Link>
            </div>
          </section>

          <section className="rounded-[1.8rem] bg-[var(--color-ink)] p-6 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-sand)]">
              Admin login
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none"
                  defaultValue="admin@digitalheroes.demo"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Password</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none"
                  defaultValue="AdminPass!2026"
                  readOnly
                />
              </div>
              <Link href="/admin" className="pill-button w-full justify-center border-white/20 bg-white text-[var(--color-ink)]">
                Enter admin dashboard
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-[1.8rem] bg-white/75 p-6">
            <p className="section-label">Start payment</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
              Monthly subscription
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              Opens Stripe Checkout for the monthly subscription plan.
            </p>
            <CheckoutButton
              planId="monthly"
              className="pill-button pill-button-primary mt-6"
            >
              Continue to payment
            </CheckoutButton>
          </section>

          <section className="rounded-[1.8rem] bg-white/75 p-6">
            <p className="section-label">Start payment</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
              Yearly subscription
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              Opens Stripe Checkout for the discounted yearly plan.
            </p>
            <CheckoutButton planId="yearly" className="pill-button mt-6">
              Continue to payment
            </CheckoutButton>
          </section>
        </div>

        <div className="mt-6 rounded-[1.6rem] border border-dashed border-[var(--color-line)] bg-[var(--color-cream)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
          Production handoff: replace demo credentials with Supabase email or magic
          link auth, then wire the post-signup action to Stripe Checkout and
          charity selection.
        </div>
      </div>
    </main>
  );
}
