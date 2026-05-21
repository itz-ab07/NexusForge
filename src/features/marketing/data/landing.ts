import { Bot, Globe, Shield, Terminal, Trophy, Users } from "lucide-react";
import type { MarketingFeature, PricingTier } from "@/types";

export const marketingFeatures: MarketingFeature[] = [
  {
    icon: Users,
    title: "Realtime Co-coding",
    desc: "Multiplayer cursors, shared selection, sub-50ms sync. Like Google Docs for code.",
    color: "neon-purple",
  },
  {
    icon: Bot,
    title: "AI Copilot",
    desc: "In-context hints, complexity analysis and bug detection trained on 1M+ contest problems.",
    color: "neon-cyan",
  },
  {
    icon: Trophy,
    title: "Live Contests",
    desc: "Spin up team rounds with ICPC-style scoreboard, penalties and replay timeline.",
    color: "neon-blue",
  },
  {
    icon: Terminal,
    title: "VS Code Editor",
    desc: "Monaco-powered editor with 40+ languages, vim mode and intelligent autocomplete.",
    color: "neon-purple",
  },
  {
    icon: Globe,
    title: "Global Judge",
    desc: "Edge sandboxes in 14 regions. Sub-second verdicts on 200+ problem sets.",
    color: "neon-cyan",
  },
  {
    icon: Shield,
    title: "Team Workspace",
    desc: "Voice rooms, channels, problem boards. Discord-grade collaboration built in.",
    color: "neon-blue",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Solo",
    price: "0",
    desc: "For individuals starting out",
    features: ["Public rooms", "Basic AI hints", "5 contests/mo", "Community"],
    cta: "Start free",
  },
  {
    name: "Squad",
    price: "19",
    desc: "For competitive teams",
    features: [
      "Private team rooms",
      "Advanced AI copilot",
      "Unlimited contests",
      "Voice & video",
      "Priority judge",
    ],
    cta: "Go Squad",
    featured: true,
  },
  {
    name: "Federation",
    price: "Custom",
    desc: "Universities & orgs",
    features: [
      "SSO + SAML",
      "Custom problem sets",
      "Coach dashboard",
      "On-prem judge",
      "Dedicated support",
    ],
    cta: "Talk to us",
  },
];

export const trustUniversities = [
  "MIT",
  "ETH Zürich",
  "Tsinghua",
  "ITMO",
  "Stanford",
  "IIT Bombay",
] as const;

export const showcaseTeams = [
  { rank: 1, name: "Quantum Bytes", score: 1247, problems: "ABCDE", color: "oklch(0.78 0.2 90)" },
  { rank: 2, name: "Hex Wraiths", score: 1189, problems: "ABCD", color: "oklch(0.85 0.18 200)" },
  { rank: 3, name: "Null Pointers", score: 1102, problems: "ABCD", color: "oklch(0.7 0.22 285)" },
  { rank: 4, name: "Recursive", score: 989, problems: "ABC", color: "oklch(0.72 0.27 340)" },
] as const;

export const testimonials = [
  {
    q: "Nexus changed how our team trains. The AI feedback is sharper than most coaches.",
    a: "Aria Vance",
    r: "Captain · MIT Quantum Bytes",
  },
  {
    q: "We replaced 4 tools with Nexus. Voice + editor + judge in one place is a cheat code.",
    a: "Kenji Park",
    r: "Coach · Tsinghua A",
  },
  {
    q: "Our regional rank jumped 38 spots after one season. The replays are gold.",
    a: "Mira Okafor",
    r: "Lead · ETH Zürich",
  },
] as const;
