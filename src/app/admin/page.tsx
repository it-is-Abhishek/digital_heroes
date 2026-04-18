import {
  charitySummaries,
  drawPreview,
  members,
  prizePoolSnapshot,
  winnerQueue,
} from "@/lib/data";
import {
  formatCurrency,
  formatLongDate,
  getMatchCount,
  getScoreFrequencyLeaders,
} from "@/lib/logic";

const frequencyLeaders = getScoreFrequencyLeaders(members);

export default function AdminPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 sm:px-10">
      <header className="glass-panel rounded-[2.4rem] p-8">
        <p className="section-label">Admin dashboard</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[var(--color-ink)]">
          Manage users, draws, charities, and winner payments.
        </h1>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-[1.6rem] bg-white/75 p-5">
            <p className="text-sm text-[var(--color-muted)]">Users</p>
            <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">
              {members.length}
            </p>
          </div>
          <div className="rounded-[1.6rem] bg-white/75 p-5">
            <p className="text-sm text-[var(--color-muted)]">Prize pool</p>
            <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">
              {formatCurrency(prizePoolSnapshot.totalPool)}
            </p>
          </div>
          <div className="rounded-[1.6rem] bg-white/75 p-5">
            <p className="text-sm text-[var(--color-muted)]">Charity outflow</p>
            <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">
              {formatCurrency(prizePoolSnapshot.charityPool)}
            </p>
          </div>
          <div className="rounded-[1.6rem] bg-[var(--color-ink)] p-5 text-white">
            <p className="text-sm text-white/70">Jackpot carryover</p>
            <p className="mt-2 text-3xl font-semibold">
              {formatCurrency(prizePoolSnapshot.carryover)}
            </p>
          </div>
        </div>
      </header>

      <section className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="feature-card rounded-[2rem] p-8">
          <p className="section-label">Draw simulation</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--color-ink)]">
                {drawPreview.mode === "algorithmic"
                  ? "Algorithmic preview"
                  : "Random preview"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                Admins can preview draw results before publishing them.
              </p>
            </div>
            <div className="rounded-full bg-white/80 px-4 py-2 text-sm text-[var(--color-muted)]">
              Publish date: {formatLongDate(drawPreview.publishDate)}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {drawPreview.drawNumbers.map((number) => (
              <span
                key={number}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-coral)] text-lg font-semibold text-[var(--color-ink)]"
              >
                {number}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {drawPreview.tiers.map((tier) => (
              <div key={tier.label} className="rounded-[1.5rem] bg-white/75 p-5">
                <p className="text-sm text-[var(--color-muted)]">{tier.label}</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">
                  {formatCurrency(tier.prize)}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {tier.rollover ? "Rollover enabled." : "Paid inside current month."}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-panel rounded-[2rem] p-8">
          <p className="section-label">Common scores</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--color-ink)]">
            Score values often used in the weighted draw mode.
          </h2>
          <div className="mt-6 space-y-3">
            {frequencyLeaders.map((item) => (
              <div
                key={item.score}
                className="flex items-center justify-between rounded-[1.4rem] bg-white/75 px-5 py-4"
              >
                <div>
                  <p className="font-medium text-[var(--color-ink)]">
                    Stableford {item.score}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {item.count} appearances across active members
                  </p>
                </div>
                <span className="rounded-full bg-[var(--color-ink)] px-3 py-1 text-sm text-white">
                  weighted
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="glass-panel rounded-[2rem] p-8">
          <p className="section-label">Winner verification</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--color-ink)]">
            Review proof, approve winners, and track payouts.
          </h2>
          <div className="mt-6 space-y-3">
            {winnerQueue.map((winner) => (
              <div
                key={winner.memberId}
                className="rounded-[1.5rem] bg-white/75 px-5 py-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-[var(--color-ink)]">
                      {winner.name}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      {winner.tier} winner • {winner.status}
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-sm text-[var(--color-ink)]">
                    {formatCurrency(winner.prize)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {winner.notes}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="feature-card rounded-[2rem] p-8">
          <p className="section-label">Main admin sections</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--color-ink)]">
            Core areas the admin needs to manage.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/75 p-5">
              <p className="font-medium text-[var(--color-ink)]">User management</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                View/edit profiles, inspect scores, and manage subscription state.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/75 p-5">
              <p className="font-medium text-[var(--color-ink)]">Charity management</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                Add, edit, delete charities and control featured visibility.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/75 p-5">
              <p className="font-medium text-[var(--color-ink)]">Draw publishing</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                Configure mode, simulate results, and publish the monthly outcome.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/75 p-5">
              <p className="font-medium text-[var(--color-ink)]">Analytics</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                Total users, pool totals, charity contributions, and draw metrics.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.6rem] bg-[var(--color-ink)] p-5 text-white">
            <p className="text-sm text-white/70">Recent entrants</p>
            <div className="mt-4 space-y-3">
              {drawPreview.entrants.map((entrant) => (
                <div key={entrant.memberId} className="flex items-center justify-between">
                  <div>
                    <p>{entrant.name}</p>
                    <p className="text-sm text-white/70">
                      {getMatchCount(entrant.matchingNumbers)} matched numbers
                    </p>
                  </div>
                  <p className="text-sm text-white/70">
                    Updated {formatLongDate(entrant.lastUpdated)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {charitySummaries.map((charity) => (
          <article key={charity.id} className="glass-panel rounded-[1.8rem] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-mint-strong)]">
              {charity.name}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {charity.description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
