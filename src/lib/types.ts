export type SubscriptionPlan = "Monthly" | "Yearly";
export type SubscriptionStatus = "Active" | "Inactive" | "Lapsed";
export type DrawMode = "random" | "algorithmic";
export type VerificationStatus = "Not required" | "Pending review" | "Approved" | "Rejected" | "Paid";

export interface ScoreEntry {
  id: string;
  value: number;
  playedOn: string;
}

export interface CharitySummary {
  id: string;
  name: string;
  category: string;
  region: string;
  description: string;
  upcomingEvent: string;
}

export interface SubscriptionSnapshot {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  renewalDate: string;
  monthlyEquivalent: number;
}

export interface VerificationSnapshot {
  status: VerificationStatus;
  notes: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  email: string;
  selectedCharity: CharitySummary;
  charityPercentage: number;
  subscription: SubscriptionSnapshot;
  scores: ScoreEntry[];
  verification: VerificationSnapshot;
}

export interface PrizeTier {
  label: string;
  matchCount: number;
  share: number;
  prize: number;
  rollover: boolean;
}

export interface DrawEntrant {
  memberId: string;
  name: string;
  matchingNumbers: number[];
  lastUpdated: string;
}

export interface DrawPreview {
  mode: DrawMode;
  drawNumbers: number[];
  publishDate: string;
  entrants: DrawEntrant[];
  tiers: PrizeTier[];
}

export interface WinnerQueueItem {
  memberId: string;
  name: string;
  tier: string;
  prize: number;
  status: VerificationStatus;
  notes: string;
}

export interface PrizePoolSnapshot {
  activeSubscribers: number;
  totalPool: number;
  fiveMatchPool: number;
  fourMatchPool: number;
  threeMatchPool: number;
  charityPool: number;
  carryover: number;
}
