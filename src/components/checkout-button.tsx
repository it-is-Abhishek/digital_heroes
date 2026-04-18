import { subscriptionPlans, type PlanId } from "@/lib/plans";

interface CheckoutButtonProps {
  planId: PlanId;
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({
  planId,
  className,
  children,
}: CheckoutButtonProps) {
  const plan = subscriptionPlans[planId];

  return (
    <a
      href={`/api/checkout?planId=${plan.id}`}
      className={className ?? "pill-button"}
    >
      {children ?? `Checkout ${plan.name}`}
    </a>
  );
}
