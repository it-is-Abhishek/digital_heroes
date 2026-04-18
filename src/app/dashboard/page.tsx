import { members, prizePoolSnapshot } from "@/lib/data";
import {
  calculateCharityContribution,
  formatCurrency,
  formatLongDate,
} from "@/lib/logic";

const member = members[0];

export default function DashboardPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 sm:px-10">
      <header className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="glass-panel rounded-[2.4rem] p-8">
          <p className="section-label">Subscriber dashboard</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[var(--color-ink)]">
            {member.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            Everything important is visible in one place: your plan, your latest
            scores, your chosen charity, and your draw status.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.6rem] bg-white/75 p-5">
              <p className="text-sm text-[var(--color-muted)]">Subscription</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">
                {member.subscription.status}
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Renews {formatLongDate(member.subscription.renewalDate)}
              </p>
            </div>
            <div className="rounded-[1.6rem] bg-white/75 p-5">
              <p className="text-sm text-[var(--color-muted)]">Current plan</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">
                {member.subscription.plan}
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {formatCurrency(member.subscription.monthlyEquivalent)} monthly
                equivalent
              </p>
            </div>
            <div className="rounded-[1.6rem] bg-[var(--color-ink)] p-5 text-white">
              <p className="text-sm text-white/70">Charity allocation</p>
              <p className="mt-2 text-2xl font-semibold">
                {calculateCharityContribution(member)}
              </p>
              <p className="mt-2 text-sm text-white/75">
                Directed to {member.selectedCharity.name}
              </p>
            </div>
          </div>
        </section>

        <section className="feature-card rounded-[2.4rem] p-8">
          <p className="section-label">Monthly draw</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--color-ink)]">
            Your latest scores are used for the draw.
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {member.scores.map((score) => (
              <span
                key={score.id}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-coral)] text-lg font-semibold text-[var(--color-ink)]"
              >
                {score.value}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            Only the last five dated scores are stored. Adding a new score removes
            the oldest one automatically.
          </p>
          <div className="mt-6 rounded-[1.6rem] bg-white/75 p-5">
            <p className="text-sm text-[var(--color-muted)]">Current jackpot</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">
              {formatCurrency(prizePoolSnapshot.fiveMatchPool)}
            </p>
          </div>
        </section>
      </header>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="glass-panel rounded-[2.2rem] p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-label">Latest scores</p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--color-ink)]">
                Last five scores
              </h2>
            </div>
            <span className="rounded-full bg-white/80 px-4 py-2 text-sm text-[var(--color-muted)]">
              Range 1 to 45
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {member.scores.map((score, index) => (
              <div
                key={score.id}
                className="flex items-center justify-between rounded-[1.4rem] bg-white/75 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[var(--color-muted)]">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-[var(--color-ink)]">
                      Stableford {score.value}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      {formatLongDate(score.playedOn)}
                    </p>
                  </div>
                </div>
                <button className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm text-[var(--color-ink)]">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="feature-card rounded-[2.2rem] p-8">
          <p className="section-label">Verification</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--color-ink)]">
            Winners upload proof for review.
          </h2>
          <div className="mt-6 rounded-[1.6rem] bg-white/80 p-5">
            <p className="text-sm text-[var(--color-muted)]">Current state</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">
              {member.verification.status}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {member.verification.notes}
            </p>
          </div>
          <div className="mt-5 rounded-[1.6rem] bg-[var(--color-ink)] p-5 text-white">
            <p className="text-sm text-white/70">Selected charity</p>
            <p className="mt-2 text-2xl font-semibold">
              {member.selectedCharity.name}
            </p>
            <p className="mt-2 text-sm text-white/75">
              {member.selectedCharity.description}
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
