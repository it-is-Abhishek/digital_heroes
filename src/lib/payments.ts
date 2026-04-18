import { getSubscriptionPlan, type PlanId } from "@/lib/plans";

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getPlanPriceId(planId: PlanId) {
  const plan = getSubscriptionPlan(planId);

  if (!plan) {
    return null;
  }

  return process.env[plan.stripePriceIdEnvKey] ?? null;
}
