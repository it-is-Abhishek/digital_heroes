import { charitySummaries } from "@/lib/data";

export default function CharitiesPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 sm:px-10">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-mint-strong)]">
          Charity directory
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[var(--color-ink)]">
          Searchable causes with real context, not placeholder logos.
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">
          The PRD asks for a listing page, individual charity profiles, and a
          featured spotlight area. This page demonstrates the listing layer and
          the data shape needed for the profile experience.
        </p>
      </header>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {charitySummaries.map((charity) => (
          <article
            key={charity.id}
            className="feature-card flex flex-col rounded-[2rem] p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-mint-strong)]">
                {charity.category}
              </span>
              <span className="text-sm text-[var(--color-muted)]">
                {charity.region}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-[var(--color-ink)]">
              {charity.name}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-muted)]">
              {charity.description}
            </p>
            <div className="mt-5 rounded-[1.5rem] bg-white/75 p-4 text-sm text-[var(--color-muted)]">
              <p className="font-medium text-[var(--color-ink)]">Upcoming event</p>
              <p className="mt-1">{charity.upcomingEvent}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
