export type PlanId = "monthly" | "yearly";

export interface SubscriptionPlanDefinition {
  id: PlanId;
  name: string;
  amount: number;
  interval: "month" | "year";
  description: string;
  stripePriceIdEnvKey: "STRIPE_MONTHLY_PRICE_ID" | "STRIPE_YEARLY_PRICE_ID";
}

export const subscriptionPlans: Record<PlanId, SubscriptionPlanDefinition> = {
  monthly: {
    id: "monthly",
    name: "Monthly plan",
    amount: 49,
    interval: "month",
    description: "Full access billed monthly with draw entry and charity support.",
    stripePriceIdEnvKey: "STRIPE_MONTHLY_PRICE_ID",
  },
  yearly: {
    id: "yearly",
    name: "Yearly plan",
    amount: 499,
    interval: "year",
    description: "Discounted yearly access with the same membership benefits.",
    stripePriceIdEnvKey: "STRIPE_YEARLY_PRICE_ID",
  },
};

export function getSubscriptionPlan(planId: string | null | undefined) {
  if (!planId || !(planId in subscriptionPlans)) {
    return null;
  }

  return subscriptionPlans[planId as PlanId];
}
