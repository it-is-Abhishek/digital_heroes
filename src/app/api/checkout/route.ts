import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getSubscriptionPlan } from "@/lib/plans";
import { getStripeServerClient } from "@/lib/stripe";

function getBaseUrl(headerStore: Headers) {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/+$/, "");
  }

  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("Unable to determine request host");
  }

  return `${protocol}://${host}`;
}

async function createCheckoutResponse(request: Request, planId: string | null | undefined) {
  const requestUrl = new URL(request.url);
  const plan = getSubscriptionPlan(planId);

  if (!plan) {
    return NextResponse.redirect(new URL("/checkout/cancel?reason=invalid-plan", request.url), 303);
  }

  const customerEmail =
    requestUrl.searchParams.get("email") || requestUrl.searchParams.get("customerEmail");

  let stripe;

  try {
    stripe = getStripeServerClient();
  } catch {
    return NextResponse.redirect(
      new URL(`/checkout/success?demo=1&plan=${plan.id}`, request.url),
      303,
    );
  }

  const headerStore = await headers();
  const baseUrl = getBaseUrl(headerStore);
  const configuredPriceId = process.env[plan.stripePriceIdEnvKey];

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/checkout/cancel`,
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    customer_email: customerEmail || undefined,
    line_items: configuredPriceId
      ? [
          {
            price: configuredPriceId,
            quantity: 1,
          },
        ]
      : [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: plan.name,
                description: plan.description,
              },
              recurring: {
                interval: plan.interval,
              },
              unit_amount: plan.amount * 100,
            },
            quantity: 1,
          },
        ],
    metadata: {
      planId: plan.id,
      source: "digital-heroes-demo",
    },
    subscription_data: {
      metadata: {
        planId: plan.id,
        source: "digital-heroes-demo",
      },
    },
    allow_promotion_codes: true,
  });

  if (!session.url) {
    return NextResponse.redirect(new URL("/checkout/cancel?reason=session-creation-failed", request.url), 303);
  }

  return NextResponse.redirect(session.url, 303);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const planId = searchParams.get("planId");

  return createCheckoutResponse(request, planId);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const planId = formData.get("planId")?.toString();
  const customerEmail = formData.get("customerEmail")?.toString();
  const requestUrl = new URL(request.url);

  if (customerEmail) {
    requestUrl.searchParams.set("customerEmail", customerEmail);
  }

  return createCheckoutResponse(new Request(requestUrl, request), planId);
}
