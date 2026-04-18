import Link from "next/link";

import { CheckoutButton } from "@/components/checkout-button";
import {
  charitySummaries,
  drawPreview,
  featuredImpact,
  members,
  prizePoolSnapshot,
} from "@/lib/data";
import {
  calculateCharityContribution,
  formatCurrency,
  formatLongDate,
  getMatchCount,
} from "@/lib/logic";

const primaryMember = members[0];
const featuredCharities = charitySummaries.slice(0, 3);
const highlightStats = [
  {
    label: "People playing",
    value: `${prizePoolSnapshot.activeSubscribers}`,
  },
  {
    label: "Prize money",
    value: formatCurrency(prizePoolSnapshot.totalPool),
  },
  {
    label: "Money for charity",
    value: formatCurrency(featuredImpact.monthlyCharityPool),
  },
  {
    label: "Top prize",
    value: formatCurrency(prizePoolSnapshot.fiveMatchPool),
  },
];

const drawCards = drawPreview.tiers.map((tier) => ({
  ...tier,
  winners: drawPreview.entrants.filter(
    (entrant) => getMatchCount(entrant.matchingNumbers) === tier.matchCount,
  ),
}));

const features = [
  {
    title: "Pick a plan",
    description: "Choose monthly or yearly and start playing.",
  },
  {
    title: "Add your scores",
    description: "Save your last five golf scores with the date.",
  },
  {
    title: "Join the draw",
    description: "Every active member joins the prize draw each month.",
  },
  {
    title: "Help a charity",
    description: "A part of each payment goes to the charity you choose.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-40" />
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-16 pt-6 sm:px-10 lg:px-12">
        <header className="glass-panel sticky top-4 z-20 mb-10 flex items-center justify-between gap-4 rounded-full px-5 py-3 backdrop-blur">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-ink)]">
              Digital Heroes
            </h1>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-[var(--color-muted)] md:flex">
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#charities">Charities</a>
            <Link href="/subscribe" className="pill-button">
              Pay
            </Link>
          </nav>
        </header>

        <div className="grid flex-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="flex flex-col justify-center gap-8 py-8 lg:py-14">
            <span className="w-fit rounded-full border border-[var(--color-line)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[var(--color-mint-strong)]">
              Golf game + prize + charity
            </span>
            <div className="space-y-6">
              <h2 className="max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-[0.92] text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
                Play golf, win prizes, and help people.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
                It is very simple. Pick a plan, add your golf scores, and join the
                monthly prize draw. We also send part of your payment to a charity.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/subscribe" className="pill-button pill-button-primary">
                Start now
              </Link>
              <Link href="#how" className="pill-button">
                See how it works
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {highlightStats.map((item, index) => (
                <article
                  key={item.label}
                  className="glass-panel rounded-[2rem] px-5 py-6"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <p className="text-sm text-[var(--color-muted)]">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
                    {item.value}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <aside className="relative flex flex-col gap-5 py-8 lg:justify-center">
            <article className="feature-card rounded-[2rem] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="section-label">Example member</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">
                    {primaryMember.name}
                  </h3>
                </div>
                <span className="rounded-full bg-[var(--color-ink)] px-3 py-1 text-sm text-white">
                  {primaryMember.subscription.plan}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-[var(--color-muted)]">Renewal</p>
                  <p className="mt-1 text-base font-medium text-[var(--color-ink)]">
                    {formatLongDate(primaryMember.subscription.renewalDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-muted)]">Charity</p>
                  <p className="mt-1 text-base font-medium text-[var(--color-ink)]">
                    {calculateCharityContribution(primaryMember)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-muted)]">Last scores</p>
                  <p className="mt-1 text-base font-medium text-[var(--color-ink)]">
                    {primaryMember.scores.map((score) => score.value).join(" / ")}
                  </p>
                </div>
              </div>
              <div className="mt-6 rounded-[1.5rem] bg-[var(--color-ink)] px-5 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-sand)]">
                  This month&apos;s winning numbers
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {drawPreview.drawNumbers.map((number) => (
                    <span
                      key={number}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-coral)] text-lg font-semibold text-[var(--color-ink)]"
                    >
                      {number}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-white/75">
                  Match these numbers to win.
                </p>
              </div>
            </article>

            <article id="how" className="glass-panel rounded-[2rem] p-6">
              <p className="section-label">How it works</p>
              <ul className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                <li>1. Pick a plan.</li>
                <li>2. Add your golf scores.</li>
                <li>3. Join the monthly draw.</li>
                <li>4. Help a charity.</li>
              </ul>
            </article>
          </aside>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-12"
      >
        <div className="mb-8">
          <p className="section-label">Why it is easy</p>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
            You only need to understand four things.
          </h3>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.title} className="glass-panel rounded-[1.8rem] p-6">
              <h4 className="text-xl font-semibold text-[var(--color-ink)]">
                {feature.title}
              </h4>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-12 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <article className="feature-card rounded-[2.2rem] p-8">
          <p className="section-label">Money split</p>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
            Your payment helps prizes and charity.
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.6rem] bg-white/70 p-5">
              <p className="text-sm text-[var(--color-muted)]">Prize money</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">
                {formatCurrency(prizePoolSnapshot.totalPool)}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                This is the money shared with winners.
              </p>
            </div>
            <div className="rounded-[1.6rem] bg-[var(--color-ink)] p-5 text-white">
              <p className="text-sm text-white/70">Charity money</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(featuredImpact.monthlyCharityPool)}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                This is the money sent to charity.
              </p>
            </div>
          </div>
        </article>

        <article className="glass-panel rounded-[2.2rem] p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="section-label">Prize levels</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
                More matches means a bigger prize.
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[var(--color-muted)]">
              If more than one person wins, the prize is shared.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {drawCards.map((tier) => (
              <div
                key={tier.label}
                className="rounded-[1.8rem] border border-white/70 bg-white/75 p-5"
              >
                <p className="text-sm text-[var(--color-muted)]">{tier.label}</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">
                  {formatCurrency(tier.prize)}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  Match {tier.matchCount} numbers.{" "}
                  {tier.rollover ? "If nobody wins, it moves to next month." : "Paid this month."}
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--color-mint-strong)]">
                  {tier.winners.length > 0
                    ? `${tier.winners.length} demo winner${tier.winners.length === 1 ? "" : "s"}`
                    : "No demo winners yet"}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section
        id="pricing"
        className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-12"
      >
        <div className="mb-8">
            <p className="section-label">Pricing</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
            Pick the plan you like best.
          </h3>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="glass-panel rounded-[2rem] p-8">
            <p className="section-label">Monthly plan</p>
            <h4 className="mt-3 text-4xl font-semibold text-[var(--color-ink)]">
              $49<span className="text-lg font-normal text-[var(--color-muted)]"> / month</span>
            </h4>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
              <li>Full access to score entry and dashboard</li>
              <li>Automatic entry into the monthly draw</li>
              <li>Pick the charity you want to help</li>
            </ul>
            <CheckoutButton
              planId="monthly"
              className="pill-button pill-button-primary mt-6"
            >
              Continue with monthly
            </CheckoutButton>
          </article>
          <article className="feature-card rounded-[2rem] p-8">
            <p className="section-label">Yearly plan</p>
            <h4 className="mt-3 text-4xl font-semibold text-[var(--color-ink)]">
              $499<span className="text-lg font-normal text-[var(--color-muted)]"> / year</span>
            </h4>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
              <li>Lower cost than paying monthly all year</li>
              <li>Same prizes and charity support</li>
              <li>Good if you want to stay longer</li>
            </ul>
            <CheckoutButton planId="yearly" className="pill-button mt-6">
              Continue with yearly
            </CheckoutButton>
          </article>
        </div>
      </section>

      <section
        id="charities"
        className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-12"
      >
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Charities</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
              You choose who your money helps.
            </h3>
          </div>
          <Link href="/charities" className="pill-button w-fit">
            See all
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredCharities.map((charity) => (
            <article
              key={charity.id}
              className="feature-card flex flex-col rounded-[2rem] p-6"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-mint-strong)]">
                {charity.category}
              </p>
              <h4 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
                {charity.name}
              </h4>
              <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-muted)]">
                {charity.description}
              </p>
              <div className="mt-5 rounded-[1.4rem] bg-white/75 p-4 text-sm text-[var(--color-muted)]">
                <p className="font-medium text-[var(--color-ink)]">
                  Upcoming event
                </p>
                <p className="mt-1">{charity.upcomingEvent}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
