import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { getStripeServerClient } from "@/lib/stripe";

export const runtime = "nodejs";

function buildWebhookEventLog(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      return {
        type: event.type,
        checkoutSessionId: session.id,
        customerEmail: session.customer_details?.email ?? null,
        subscriptionId:
          typeof session.subscription === "string" ? session.subscription : null,
        planId: session.metadata?.planId ?? null,
      };
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      return {
        type: event.type,
        subscriptionId: subscription.id,
        status: subscription.status,
        customerId:
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer?.id ?? null,
        planId: subscription.metadata.planId ?? null,
      };
    }
    default:
      return {
        type: event.type,
      };
  }
}

export async function POST(request: Request) {
  const signature = (await headers()).get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe webhook configuration" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    const payload = await request.text();
    const stripe = getStripeServerClient();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid webhook payload";

    return NextResponse.json({ error: message }, { status: 400 });
  }

  const logPayload = buildWebhookEventLog(event);
  console.log("Stripe webhook received:", logPayload);

  return NextResponse.json({ received: true, type: event.type });
}
