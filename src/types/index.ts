/** Domain types — ready for API contract alignment */

import type { LucideIcon } from "lucide-react";

export type User = {
  id: string;
  email: string;
  handle: string;
  firstName: string;
  lastName?: string;
};

export type Session = {
  user: User;
  accessToken: string;
  expiresAt: string;
};

export type RoomMember = {
  name: string;
  role: string;
  color: string;
  status: "coding" | "thinking" | "idle";
  mic: boolean;
};

export type CodeLine = {
  n: number;
  t: string;
  c?: string;
  marker?: string;
};

export type ChatMessage = {
  who: string;
  txt: string;
  c: string;
};

export type DashboardRoom = {
  name: string;
  members: number;
  lang: string;
  live: boolean;
  color: string;
};

export type ContestPreview = {
  name: string;
  date: string;
  teams: number;
  rank: string;
};

export type ActivityItem = {
  who: string;
  what: string;
  subj: string;
  t: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  pts: number;
  delta: string;
};

export type MarketingFeature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
};

export type PricingTier = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  featured?: boolean;
};
