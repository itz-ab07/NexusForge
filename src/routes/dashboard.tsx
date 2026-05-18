import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity, Bot, Trophy, Users, Plus, ArrowUpRight, Flame, Target,
  Zap, TrendingUp, Code2, Bell,
} from "lucide-react";
import { GridBackdrop } from "@/components/cyber/GridBackdrop";
import { Navbar } from "@/components/cyber/Navbar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Nexus.dev" }] }),
  component: Dashboard,
});

const rooms = [
  { name: "Graph Algorithms Drill", members: 4, lang: "C++", live: true, color: "oklch(0.7 0.22 285)" },
  { name: "Codeforces Round 962", members: 3, lang: "Python", live: true, color: "oklch(0.85 0.18 200)" },
  { name: "DP Mastery", members: 2, lang: "Rust", live: false, color: "oklch(0.72 0.27 340)" },
];

const contests = [
  { name: "Quantum Open Finals", date: "in 2h", teams: 128, rank: "#3" },
  { name: "ICPC NA Regional", date: "Sat 18:00", teams: 412, rank: "—" },
  { name: "Nexus Weekly #47", date: "Sun 14:00", teams: 2048, rank: "—" },
];

const activity = [
  { who: "Aria", what: "solved", subj: "Tree DP — Hard", t: "2m" },
  { who: "Kenji", what: "joined", subj: "Graph Algorithms Drill", t: "8m" },
  { who: "AI Copilot", what: "suggested", subj: "O(n log n) refactor on dijkstra.cpp", t: "12m" },
  { who: "Mira", what: "submitted", subj: "Problem D · Accepted", t: "21m" },
  { who: "Ravi", what: "started", subj: "Daily challenge", t: "1h" },
];

const leaderboard = [
  { rank: 1, name: "Quantum Bytes", pts: 12490, delta: "+24" },
  { rank: 2, name: "Hex Wraiths", pts: 11820, delta: "+12" },
  { rank: 3, name: "Null Pointers", pts: 10977, delta: "−4" },
  { rank: 4, name: "Recursive Co.", pts: 9812, delta: "+8" },
];

function Dashboard() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <GridBackdrop />
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[oklch(0.85_0.18_200)]">// Welcome back, Aria</p>
            <h1 className="mt-2 font-display text-4xl font-bold">Command Center</h1>
            <p className="text-muted-foreground mt-1">3 rooms live · next contest in 2h 14m</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm hover:bg-white/5 transition">
              <Bell className="h-4 w-4" /> Notifications
            </button>
            <Link to="/room" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-medium glow-purple hover:opacity-90 transition">
              <Plus className="h-4 w-4" /> New room
            </Link>
          </div>
        </div>

        {/* Stat row */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Rating", value: "2147", icon: TrendingUp, hint: "+38 this week", c: "oklch(0.85 0.18 200)" },
            { label: "Solved", value: "847", icon: Target, hint: "12 today", c: "oklch(0.7 0.22 285)" },
            { label: "Streak", value: "42d", icon: Flame, hint: "personal best", c: "oklch(0.72 0.27 340)" },
            { label: "Wins", value: "23", icon: Trophy, hint: "season 4", c: "oklch(0.78 0.2 90)" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="holo-card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
                <s.icon className="h-4 w-4" style={{ color: s.c }} />
              </div>
              <p className="mt-3 font-display text-3xl font-bold" style={{ color: s.c }}>{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Active rooms */}
          <div className="holo-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold">Active rooms</h2>
                <p className="text-xs text-muted-foreground">Jump back into your live sessions</p>
              </div>
              <button className="text-xs text-[oklch(0.85_0.18_200)] hover:underline">View all</button>
            </div>
            <div className="mt-5 space-y-3">
              {rooms.map((r) => (
                <Link
                  key={r.name}
                  to="/room"
                  className="flex items-center justify-between rounded-xl glass px-4 py-3.5 hover:bg-white/5 transition group"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: `${r.color.replace(")", " / 0.2)")}`, border: `1px solid ${r.color.replace(")", " / 0.5)")}`}}>
                      <Code2 className="h-4 w-4" style={{ color: r.color }} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{r.lang} · {r.members} members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {r.live && (
                      <span className="flex items-center gap-1.5 text-xs">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.7_0.18_150)] opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.7_0.18_150)]" />
                        </span>
                        <span className="text-[oklch(0.85_0.2_150)]">Live</span>
                      </span>
                    )}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* AI suggestions */}
          <div className="holo-card p-6">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-[oklch(0.85_0.18_200)]" />
              <h2 className="font-display text-lg font-semibold">AI suggestions</h2>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { tag: "PRACTICE", text: "Try 3 segment-tree problems — your weakest topic this week.", c: "oklch(0.85 0.18 200)" },
                { tag: "RECOVER", text: "You're 38h into a sprint. Consider a 2-hour break.", c: "oklch(0.78 0.2 90)" },
                { tag: "REFACTOR", text: "graph_traversal.cpp can be simplified by 24 lines.", c: "oklch(0.7 0.22 285)" },
              ].map((s) => (
                <div key={s.tag} className="rounded-lg glass p-3">
                  <span className="font-mono text-[10px] tracking-widest" style={{ color: s.c }}>{s.tag}</span>
                  <p className="mt-1 text-sm leading-snug">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming contests */}
          <div className="holo-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Upcoming contests</h2>
              <Trophy className="h-4 w-4 text-[oklch(0.78_0.2_90)]" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {contests.map((c) => (
                <div key={c.name} className="rounded-xl glass p-4 hover:bg-white/5 transition cursor-pointer">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground font-mono">{c.date}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3 w-3" /> {c.teams}
                    </span>
                    <span className="rounded-full bg-[oklch(0.7_0.22_285/0.2)] px-2 py-0.5 text-[oklch(0.85_0.18_200)]">{c.rank}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="holo-card p-6">
            <h2 className="font-display text-lg font-semibold">Team leaderboard</h2>
            <div className="mt-5 space-y-2">
              {leaderboard.map((t) => (
                <div key={t.rank} className="flex items-center justify-between rounded-lg glass px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-sm font-bold w-5 ${t.rank===1?"text-[oklch(0.78_0.2_90)]":t.rank===2?"text-[oklch(0.85_0.18_200)]":"text-muted-foreground"}`}>#{t.rank}</span>
                    <span className="text-sm">{t.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono">{t.pts.toLocaleString()}</span>
                    <span className={t.delta.startsWith("+") ? "text-[oklch(0.85_0.2_150)]" : "text-[oklch(0.7_0.2_25)]"}>{t.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="holo-card p-6 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[oklch(0.85_0.18_200)]" />
              <h2 className="font-display text-lg font-semibold">Activity feed</h2>
            </div>
            <div className="mt-5 space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-[10px] font-bold text-white">
                    {a.who.split(" ").map(n=>n[0]).join("").slice(0,2)}
                  </div>
                  <p className="flex-1">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>{" "}
                    <span>{a.subj}</span>
                  </p>
                  <span className="text-xs text-muted-foreground font-mono">{a.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team performance */}
          <div className="holo-card p-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[oklch(0.78_0.2_90)]" />
              <h2 className="font-display text-lg font-semibold">Team pulse</h2>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { name: "Accuracy", value: 87, c: "oklch(0.85 0.18 200)" },
                { name: "Speed", value: 72, c: "oklch(0.7 0.22 285)" },
                { name: "Coverage", value: 94, c: "oklch(0.72 0.27 340)" },
              ].map((m) => (
                <div key={m.name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{m.name}</span>
                    <span className="font-mono font-semibold">{m.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[oklch(0.2_0.03_270)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${m.c}, oklch(0.85 0.18 200))`, boxShadow: `0 0 12px ${m.c}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
