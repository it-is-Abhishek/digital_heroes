import type { MemberProfile, PrizePoolSnapshot, ScoreEntry } from "@/lib/types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function sortScoresDescending(scores: ScoreEntry[]) {
  return [...scores].sort(
    (left, right) =>
      new Date(right.playedOn).getTime() - new Date(left.playedOn).getTime(),
  );
}

export function retainLatestScores(scores: ScoreEntry[]) {
  const byDate = new Map<string, ScoreEntry>();

  sortScoresDescending(scores).forEach((score) => {
    if (!byDate.has(score.playedOn)) {
      byDate.set(score.playedOn, score);
    }
  });

  return [...byDate.values()].slice(0, 5);
}

export function calculatePrizePool({
  activeSubscribers,
  monthlyEquivalentFee,
  charityRate,
  carryover,
}: {
  activeSubscribers: number;
  monthlyEquivalentFee: number;
  charityRate: number;
  carryover: number;
}): PrizePoolSnapshot {
  const gross = activeSubscribers * monthlyEquivalentFee;
  const charityPool = gross * charityRate;
  const prizePoolBase = gross - charityPool;

  return {
    activeSubscribers,
    totalPool: prizePoolBase + carryover,
    fiveMatchPool: prizePoolBase * 0.4 + carryover,
    fourMatchPool: prizePoolBase * 0.35,
    threeMatchPool: prizePoolBase * 0.25,
    charityPool,
    carryover,
  };
}

export function getScoreFrequencyLeaders(members: MemberProfile[]) {
  const counts = new Map<number, number>();

  members.flatMap((member) => member.scores).forEach((score) => {
    counts.set(score.value, (counts.get(score.value) ?? 0) + 1);
  });

  return [...counts.entries()]
    .map(([score, count]) => ({ score, count }))
    .sort((left, right) => right.count - left.count || right.score - left.score)
    .slice(0, 5);
}

export function getMatchCount(numbers: number[]) {
  return numbers.length;
}

export function calculateCharityContribution(member: MemberProfile) {
  return `${member.charityPercentage}% to ${member.selectedCharity.name}`;
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatLongDate(value: string) {
  return dateFormatter.format(new Date(value));
}
