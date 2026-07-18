import type { Priority, TaxReturn } from "@/types";

const priorityWeights: Record<Priority, number> = {
  critical: 40,
  high: 30,
  medium: 20,
  low: 10,
};

export function calculatePriorityScore(
  taxReturn: TaxReturn,
  currentDate = new Date("2026-07-17T12:00:00"),
): number {
  const deadline = new Date(`${taxReturn.deadline}T23:59:59`);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const daysRemaining = Math.ceil(
    (deadline.getTime() - currentDate.getTime()) /
      millisecondsPerDay,
  );

  const deadlineScore =
    daysRemaining <= 1
      ? 40
      : daysRemaining <= 3
        ? 30
        : daysRemaining <= 7
          ? 20
          : 5;

  const nextActionScore =
    taxReturn.nextActionOwner === "preparer" ? 15 : 0;

  const statusScore =
    taxReturn.status === "needs-attention"
      ? 20
      : taxReturn.status === "ready-for-review"
        ? 15
        : taxReturn.status === "client-action-required"
          ? 10
          : 0;

  return (
    priorityWeights[taxReturn.priority] +
    deadlineScore +
    nextActionScore +
    statusScore
  );
}