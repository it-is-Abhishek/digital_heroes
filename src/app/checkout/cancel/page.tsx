import Link from "next/link";

type CancelPageProps = {
  searchParams: Promise<{
    reason?: string;
  }>;
};

const reasonMessages: Record<string, string> = {
  "invalid-plan": "The selected plan was not valid.",
  "missing-stripe-key": "Stripe is not configured yet. Add your Stripe secret key to continue.",
  "session-creation-failed": "Stripe could not create a checkout session.",
};

export default async function CheckoutCancelPage({
  searchParams,
}: CancelPageProps) {
  const { reason } = await searchParams;
  const message =
    (reason && reasonMessages[reason]) ||
    "Checkout was cancelled before payment was completed.";

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-10 sm:px-10">
      <section className="glass-panel rounded-[2.2rem] p-8">
        <p className="section-label">Payment cancelled</p>
        <h1 className="mt-3 text-4xl font-semibold text-[var(--color-ink)]">
          Checkout did not finish.
        </h1>
        <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
          {message}
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Link href="/" className="pill-button pill-button-primary">
            Try again
          </Link>
          <Link href="/auth" className="pill-button">
            View access page
          </Link>
        </div>
      </section>
    </main>
  );
}
