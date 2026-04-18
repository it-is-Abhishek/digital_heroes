import { calculatePrizePool, retainLatestScores } from "@/lib/logic";
import type {
  CharitySummary,
  DrawPreview,
  MemberProfile,
  WinnerQueueItem,
} from "@/lib/types";

export const charitySummaries: CharitySummary[] = [
  {
    id: "charity-1",
    name: "Open Fairways Trust",
    category: "Youth access",
    region: "United Kingdom",
    description:
      "Creates subsidised access to golf coaching, transport, and competition days for underrepresented young players.",
    upcomingEvent: "Community golf day on June 14, 2026",
  },
  {
    id: "charity-2",
    name: "Heartbeat Relief",
    category: "Medical support",
    region: "Ireland",
    description:
      "Funds mobile cardiac screening clinics and recovery support for families navigating sudden health events.",
    upcomingEvent: "Corporate scramble fundraiser on July 9, 2026",
  },
  {
    id: "charity-3",
    name: "Greens For Good",
    category: "Environmental repair",
    region: "Australia",
    description:
      "Restores urban green spaces and funds water-conscious course maintenance pilots in drought-prone regions.",
    upcomingEvent: "Volunteer planting weekend on May 22, 2026",
  },
];

export const members: MemberProfile[] = [
  {
    id: "member-1",
    name: "Amelia Stone",
    email: "amelia@digitalheroes.demo",
    selectedCharity: charitySummaries[1],
    charityPercentage: 18,
    subscription: {
      plan: "Yearly",
      status: "Active",
      renewalDate: "2026-11-02",
      monthlyEquivalent: 42,
    },
    scores: retainLatestScores([
      { id: "s1", value: 34, playedOn: "2026-04-16" },
      { id: "s2", value: 31, playedOn: "2026-04-03" },
      { id: "s3", value: 35, playedOn: "2026-03-28" },
      { id: "s4", value: 29, playedOn: "2026-03-11" },
      { id: "s5", value: 33, playedOn: "2026-02-18" },
      { id: "s6", value: 28, playedOn: "2026-01-26" },
    ]),
    verification: {
      status: "Pending review",
      notes:
        "Proof uploaded for the latest 4-match result. Admin must approve before payout moves from pending to paid.",
    },
  },
  {
    id: "member-2",
    name: "Rory Hale",
    email: "rory@digitalheroes.demo",
    selectedCharity: charitySummaries[0],
    charityPercentage: 12,
    subscription: {
      plan: "Monthly",
      status: "Active",
      renewalDate: "2026-05-06",
      monthlyEquivalent: 49,
    },
    scores: retainLatestScores([
      { id: "s7", value: 30, playedOn: "2026-04-12" },
      { id: "s8", value: 34, playedOn: "2026-03-19" },
      { id: "s9", value: 27, playedOn: "2026-03-02" },
      { id: "s10", value: 31, playedOn: "2026-02-17" },
      { id: "s11", value: 22, playedOn: "2026-02-01" },
    ]),
    verification: {
      status: "Not required",
      notes: "Verification is only requested for winning members.",
    },
  },
  {
    id: "member-3",
    name: "Noah Reid",
    email: "noah@digitalheroes.demo",
    selectedCharity: charitySummaries[2],
    charityPercentage: 15,
    subscription: {
      plan: "Monthly",
      status: "Active",
      renewalDate: "2026-05-11",
      monthlyEquivalent: 49,
    },
    scores: retainLatestScores([
      { id: "s12", value: 35, playedOn: "2026-04-15" },
      { id: "s13", value: 24, playedOn: "2026-04-01" },
      { id: "s14", value: 29, playedOn: "2026-03-14" },
      { id: "s15", value: 31, playedOn: "2026-02-25" },
      { id: "s16", value: 34, playedOn: "2026-02-09" },
    ]),
    verification: {
      status: "Approved",
      notes: "Verification cleared for the March 3-match prize payout.",
    },
  },
];

export const prizePoolSnapshot = calculatePrizePool({
  activeSubscribers: 184,
  monthlyEquivalentFee: 46,
  charityRate: 0.16,
  carryover: 2400,
});

export const drawPreview: DrawPreview = {
  mode: "algorithmic",
  drawNumbers: [34, 31, 35, 29, 30],
  publishDate: "2026-04-30",
  entrants: [
    {
      memberId: "member-1",
      name: "Amelia Stone",
      matchingNumbers: [34, 31, 35, 29],
      lastUpdated: "2026-04-16",
    },
    {
      memberId: "member-2",
      name: "Rory Hale",
      matchingNumbers: [34, 31, 30],
      lastUpdated: "2026-04-12",
    },
    {
      memberId: "member-3",
      name: "Noah Reid",
      matchingNumbers: [34, 31, 35, 29],
      lastUpdated: "2026-04-15",
    },
  ],
  tiers: [
    {
      label: "5-number match",
      matchCount: 5,
      share: 0.4,
      prize: prizePoolSnapshot.fiveMatchPool,
      rollover: true,
    },
    {
      label: "4-number match",
      matchCount: 4,
      share: 0.35,
      prize: prizePoolSnapshot.fourMatchPool,
      rollover: false,
    },
    {
      label: "3-number match",
      matchCount: 3,
      share: 0.25,
      prize: prizePoolSnapshot.threeMatchPool,
      rollover: false,
    },
  ],
};

export const winnerQueue: WinnerQueueItem[] = [
  {
    memberId: "member-1",
    name: "Amelia Stone",
    tier: "4-number match",
    prize: prizePoolSnapshot.fourMatchPool / 2,
    status: "Pending review",
    notes:
      "Screenshot proof submitted from the connected golf app. Admin approval is still outstanding.",
  },
  {
    memberId: "member-3",
    name: "Noah Reid",
    tier: "4-number match",
    prize: prizePoolSnapshot.fourMatchPool / 2,
    status: "Paid",
    notes:
      "Submission approved and payout marked complete after manual finance confirmation.",
  },
];

export const featuredImpact = {
  monthlyCharityPool: prizePoolSnapshot.charityPool,
};
