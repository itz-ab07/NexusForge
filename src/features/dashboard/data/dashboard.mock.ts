import { NEON_COLORS } from "@/shared/constants/neon";

export const dashboardRooms = [
  { name: "Graph Algorithms Drill", members: 4, lang: "C++", live: true, color: NEON_COLORS.purple },
  { name: "Codeforces Round 962", members: 3, lang: "Python", live: true, color: NEON_COLORS.cyan },
  { name: "DP Mastery", members: 2, lang: "Rust", live: false, color: NEON_COLORS.pink },
] as const;

export const dashboardContests = [
  { name: "Quantum Open Finals", date: "in 2h", teams: 128, rank: "#3" },
  { name: "ICPC NA Regional", date: "Sat 18:00", teams: 412, rank: "—" },
  { name: "Nexus Weekly #47", date: "Sun 14:00", teams: 2048, rank: "—" },
] as const;

export const dashboardActivity = [
  { who: "Aria", what: "solved", subj: "Tree DP — Hard", t: "2m" },
  { who: "Kenji", what: "joined", subj: "Graph Algorithms Drill", t: "8m" },
  { who: "AI Copilot", what: "suggested", subj: "O(n log n) refactor on dijkstra.cpp", t: "12m" },
  { who: "Mira", what: "submitted", subj: "Problem D · Accepted", t: "21m" },
  { who: "Ravi", what: "started", subj: "Daily challenge", t: "1h" },
] as const;

export const dashboardLeaderboard = [
  { rank: 1, name: "Quantum Bytes", pts: 12490, delta: "+24" },
  { rank: 2, name: "Hex Wraiths", pts: 11820, delta: "+12" },
  { rank: 3, name: "Null Pointers", pts: 10977, delta: "−4" },
  { rank: 4, name: "Recursive Co.", pts: 9812, delta: "+8" },
] as const;

export type DashboardStatKey = "rating" | "solved" | "streak" | "wins";

export const dashboardStats = [
  {
    key: "rating" as const,
    label: "Rating",
    value: "2147",
    hint: "+38 this week",
    color: NEON_COLORS.cyan,
    textClass: "text-neon-cyan",
  },
  {
    key: "solved" as const,
    label: "Solved",
    value: "847",
    hint: "12 today",
    color: NEON_COLORS.purple,
    textClass: "text-syntax-purple",
  },
  {
    key: "streak" as const,
    label: "Streak",
    value: "42d",
    hint: "personal best",
    color: NEON_COLORS.pink,
    textClass: "text-neon-pink",
  },
  {
    key: "wins" as const,
    label: "Wins",
    value: "23",
    hint: "season 4",
    color: NEON_COLORS.gold,
    textClass: "text-neon-gold",
  },
] as const;

export const dashboardAiSuggestions = [
  {
    tag: "PRACTICE",
    text: "Try 3 segment-tree problems — your weakest topic this week.",
    color: NEON_COLORS.cyan,
    textClass: "text-neon-cyan",
  },
  {
    tag: "RECOVER",
    text: "You're 38h into a sprint. Consider a 2-hour break.",
    color: NEON_COLORS.gold,
    textClass: "text-neon-gold",
  },
  {
    tag: "REFACTOR",
    text: "graph_traversal.cpp can be simplified by 24 lines.",
    color: NEON_COLORS.purple,
    textClass: "text-syntax-purple",
  },
] as const;

export const dashboardTeamPulse = [
  { name: "Accuracy", value: 87, color: NEON_COLORS.cyan },
  { name: "Speed", value: 72, color: NEON_COLORS.purple },
  { name: "Coverage", value: 94, color: NEON_COLORS.pink },
] as const;
