import Link from "next/link";

import { getStripeServerClient } from "@/lib/stripe";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
    demo?: string;
    plan?: string;
    paid?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id: sessionId, demo, plan, paid } = await searchParams;

  if (demo === "1") {
    if (paid !== "1") {
      return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 sm:px-10">
          <section className="feature-card rounded-[2.2rem] p-8">
            <p className="section-label">Demo payment gateway</p>
            <h1 className="mt-3 text-4xl font-semibold text-[var(--color-ink)]">
              Fill these boxes and tap Pay now.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
              This is a practice payment screen. It helps you test the full payment step.
            </p>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="glass-panel rounded-[2rem] p-6">
                <p className="section-label">Card details</p>
                <form action="/checkout/success" method="GET" className="mt-4 space-y-4">
                  <input type="hidden" name="demo" value="1" />
                  <input type="hidden" name="paid" value="1" />
                  <input type="hidden" name="plan" value={plan ?? "monthly"} />

                  <div>
                    <label
                      htmlFor="cardholder"
                      className="text-sm font-medium text-[var(--color-ink)]"
                    >
                      Name on card
                    </label>
                    <input
                      id="cardholder"
                      name="cardholder"
                      defaultValue="Amelia Stone"
                      className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="text-sm font-medium text-[var(--color-ink)]"
                    >
                      Card number
                    </label>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      defaultValue="4242 4242 4242 4242"
                      className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="expiry"
                        className="text-sm font-medium text-[var(--color-ink)]"
                      >
                        Expiry
                      </label>
                      <input
                        id="expiry"
                        name="expiry"
                        defaultValue="12/30"
                        className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvc"
                        className="text-sm font-medium text-[var(--color-ink)]"
                      >
                        CVC
                      </label>
                      <input
                        id="cvc"
                        name="cvc"
                        defaultValue="123"
                        className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zip"
                        className="text-sm font-medium text-[var(--color-ink)]"
                      >
                        Zip code
                      </label>
                      <input
                        id="zip"
                        name="zip"
                        defaultValue="10001"
                        className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none"
                      />
                    </div>
                  </div>

                  <button type="submit" className="pill-button pill-button-primary">
                    Pay now
                  </button>
                </form>
              </section>

              <section className="glass-panel rounded-[2rem] p-6">
                <p className="section-label">Your payment</p>
                <div className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
                  <div className="rounded-[1.4rem] bg-white/80 px-4 py-4">
                    <p className="font-medium text-[var(--color-ink)]">Plan</p>
                    <p className="mt-1">{plan ?? "monthly"}</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-white/80 px-4 py-4">
                    <p className="font-medium text-[var(--color-ink)]">Type</p>
                    <p className="mt-1">Demo payment</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-white/80 px-4 py-4">
                    <p className="font-medium text-[var(--color-ink)]">What this does</p>
                    <p className="mt-1">
                      Lets you test the payment step.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Link href="/subscribe" className="pill-button">
                    Go back
                  </Link>
                  <Link href="/" className="pill-button">
                    Home
                  </Link>
                </div>
              </section>
            </div>
          </section>
        </main>
      );
    }

    return (
      <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-10 sm:px-10">
        <section className="feature-card rounded-[2.2rem] p-8">
          <p className="section-label">Demo payment success</p>
          <h1 className="mt-3 text-4xl font-semibold text-[var(--color-ink)]">
            Payment done.
          </h1>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
            Your practice payment worked.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-white/80 p-5">
              <p className="text-sm text-[var(--color-muted)]">Mode</p>
              <p className="mt-2 text-xl font-semibold text-[var(--color-ink)]">
                Demo
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/80 p-5">
              <p className="text-sm text-[var(--color-muted)]">Plan</p>
              <p className="mt-2 text-xl font-semibold text-[var(--color-ink)]">
                {plan ?? "monthly"}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/80 p-5">
              <p className="text-sm text-[var(--color-muted)]">Result</p>
              <p className="mt-2 text-xl font-semibold text-[var(--color-ink)]">
                Success
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/dashboard" className="pill-button pill-button-primary">
              Open dashboard
            </Link>
            <Link href="/subscribe" className="pill-button">
              Pay again
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (!sessionId) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-10 sm:px-10">
        <section className="glass-panel rounded-[2.2rem] p-8">
          <p className="section-label">Payment success</p>
          <h1 className="mt-3 text-4xl font-semibold text-[var(--color-ink)]">
            Payment completed.
          </h1>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
            The checkout finished, but no Stripe session ID was returned to display
            the full payment summary.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/dashboard" className="pill-button pill-button-primary">
              Go to dashboard
            </Link>
            <Link href="/" className="pill-button">
              Back to homepage
            </Link>
          </div>
        </section>
      </main>
    );
  }

  let sessionDetails:
    | {
        customerEmail?: string | null;
        subscriptionId?: string | null;
        status?: string | null;
      }
    | undefined;

  try {
    const stripe = getStripeServerClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    sessionDetails = {
      customerEmail: session.customer_details?.email,
      subscriptionId:
        typeof session.subscription === "string" ? session.subscription : null,
      status: session.status,
    };
  } catch {
    sessionDetails = undefined;
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-10 sm:px-10">
      <section className="feature-card rounded-[2.2rem] p-8">
        <p className="section-label">Payment success</p>
        <h1 className="mt-3 text-4xl font-semibold text-[var(--color-ink)]">
          Subscription checkout completed.
        </h1>
        <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
          The Stripe Checkout flow returned successfully. In production, this is
          where you would confirm the subscription in your database and unlock the
          member account.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.5rem] bg-white/80 p-5">
            <p className="text-sm text-[var(--color-muted)]">Checkout status</p>
            <p className="mt-2 text-xl font-semibold text-[var(--color-ink)]">
              {sessionDetails?.status ?? "Paid"}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/80 p-5">
            <p className="text-sm text-[var(--color-muted)]">Customer email</p>
            <p className="mt-2 text-xl font-semibold break-all text-[var(--color-ink)]">
              {sessionDetails?.customerEmail ?? "Collected in Stripe"}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/80 p-5">
            <p className="text-sm text-[var(--color-muted)]">Subscription</p>
            <p className="mt-2 text-xl font-semibold break-all text-[var(--color-ink)]">
              {sessionDetails?.subscriptionId ?? "Created"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Link href="/dashboard" className="pill-button pill-button-primary">
            Go to dashboard
          </Link>
          <Link href="/" className="pill-button">
            Back to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
