import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bot, Mic, MicOff, Video, Send, Play, Users, FileCode,
  Circle, ChevronLeft, Settings, Sparkles, Hash,
} from "lucide-react";
import { useState } from "react";
import { GridBackdrop } from "@/components/cyber/GridBackdrop";

export const Route = createFileRoute("/room")({
  head: () => ({ meta: [{ title: "Live Room — Nexus.dev" }] }),
  component: Room,
});

const members = [
  { name: "Aria Vance", role: "Captain", color: "oklch(0.7 0.22 285)", status: "coding", mic: true },
  { name: "Kenji Park", role: "Algo",   color: "oklch(0.85 0.18 200)", status: "thinking", mic: true },
  { name: "Mira Okafor", role: "DS",     color: "oklch(0.72 0.27 340)", status: "idle", mic: false },
  { name: "Ravi Kumar", role: "DP",      color: "oklch(0.78 0.2 90)",   status: "coding", mic: true },
];

const codeLines = [
  { n: 1, t: "#include <bits/stdc++.h>", c: "purple" },
  { n: 2, t: "using namespace std;", c: "purple" },
  { n: 3, t: "" },
  { n: 4, t: "// Find shortest path in weighted DAG", c: "muted" },
  { n: 5, t: "int n, m;", c: "" },
  { n: 6, t: "vector<pair<int,int>> adj[200005];", c: "" },
  { n: 7, t: "vector<int> dist(200005, INT_MAX);", c: "" },
  { n: 8, t: "" },
  { n: 9, t: "void dijkstra(int src) {", c: "yellow", marker: "Aria" },
  { n: 10, t: "    priority_queue<pair<int,int>,", c: "" },
  { n: 11, t: "        vector<pair<int,int>>, greater<>> pq;", c: "" },
  { n: 12, t: "    dist[src] = 0;", c: "" },
  { n: 13, t: "    pq.push({0, src});", c: "" },
  { n: 14, t: "    while (!pq.empty()) {", c: "purple", marker: "Kenji" },
  { n: 15, t: "        auto [d, u] = pq.top(); pq.pop();", c: "" },
  { n: 16, t: "        if (d > dist[u]) continue;", c: "" },
  { n: 17, t: "        for (auto [v, w] : adj[u]) {", c: "purple" },
  { n: 18, t: "            if (dist[u] + w < dist[v]) {", c: "purple" },
  { n: 19, t: "                dist[v] = dist[u] + w;", c: "" },
  { n: 20, t: "                pq.push({dist[v], v});", c: "" },
  { n: 21, t: "            }", c: "" },
  { n: 22, t: "        }", c: "" },
  { n: 23, t: "    }", c: "" },
  { n: 24, t: "}", c: "" },
];

const colorMap: Record<string, string> = {
  purple: "text-[oklch(0.7_0.22_285)]",
  yellow: "text-[oklch(0.78_0.2_90)]",
  cyan:   "text-[oklch(0.85_0.18_200)]",
  pink:   "text-[oklch(0.72_0.27_340)]",
  muted:  "text-muted-foreground",
};
const markerColor: Record<string, string> = {
  Aria: "oklch(0.7 0.22 285)",
  Kenji: "oklch(0.85 0.18 200)",
};

function Room() {
  const [chat, setChat] = useState([
    { who: "Kenji", txt: "I'll handle the priority queue init", c: "oklch(0.85 0.18 200)" },
    { who: "Aria",  txt: "Cool, I'll write the relax loop", c: "oklch(0.7 0.22 285)" },
    { who: "AI",    txt: "Heads up: line 16 prevents stale entries — good call.", c: "oklch(0.78 0.2 90)" },
  ]);
  const [input, setInput] = useState("");

  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col">
      <GridBackdrop />

      {/* Top bar */}
      <header className="glass-strong border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/5 transition">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-[oklch(0.85_0.18_200)]" />
              <h1 className="font-display font-semibold">graph-algorithms-drill</h1>
              <span className="rounded-full bg-[oklch(0.7_0.18_150/0.2)] px-2 py-0.5 text-[10px] text-[oklch(0.85_0.2_150)] flex items-center gap-1">
                <Circle className="h-1.5 w-1.5 fill-current" /> LIVE
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono">Quantum Bytes · 4 active</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-xl glass px-4 py-2 font-mono text-sm">
            <span className="text-muted-foreground">Contest </span>
            <span className="text-[oklch(0.85_0.18_200)] font-semibold">02:47:18</span>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-medium glow-purple hover:opacity-90 transition">
            <Play className="h-3.5 w-3.5" /> Run
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/5 transition">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-3 p-3 min-h-0">
        {/* Left: members */}
        <aside className="col-span-12 md:col-span-2 holo-card p-4 overflow-y-auto scrollbar-thin">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-[oklch(0.85_0.18_200)]" />
            <h2 className="font-semibold text-sm">Squad</h2>
          </div>
          <div className="space-y-2">
            {members.map((m) => (
              <div key={m.name} className="rounded-lg glass p-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${m.color}, oklch(0.85 0.18 200))` }}>
                      {m.name.split(" ").map(n=>n[0]).join("")}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card animate-pulse-glow"
                      style={{ background: m.status === "idle" ? "oklch(0.55 0.04 270)" : "oklch(0.7 0.18 150)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{m.name}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{m.role} · {m.status}</p>
                  </div>
                  {m.mic ? <Mic className="h-3 w-3 text-[oklch(0.85_0.2_150)]" /> : <MicOff className="h-3 w-3 text-muted-foreground" />}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg glass p-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Voice Room</p>
            <div className="mt-2 flex items-center gap-2">
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-[oklch(0.7_0.18_150/0.2)] py-1.5 text-xs text-[oklch(0.85_0.2_150)]">
                <Mic className="h-3 w-3" /> On
              </button>
              <button className="grid h-7 w-7 place-items-center rounded-md glass">
                <Video className="h-3 w-3" />
              </button>
            </div>
          </div>
        </aside>

        {/* Center: editor */}
        <main className="col-span-12 md:col-span-7 flex flex-col gap-3 min-w-0">
          {/* Problem panel */}
          <div className="holo-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[oklch(0.85_0.18_200)]">Problem D · 1500 pts</p>
                <h3 className="mt-1 font-display text-lg font-semibold">Shortest Path Through the Grid</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Given a weighted DAG with N ≤ 2·10⁵ nodes and M ≤ 5·10⁵ edges, find the shortest
                  path from node 1 to every other node. Output −1 for unreachable nodes.
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">Submissions</p>
                <p className="font-mono text-sm">3 / 50</p>
                <p className="text-xs text-[oklch(0.85_0.2_150)] mt-1">2 AC</p>
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="holo-card flex-1 flex flex-col overflow-hidden glow-purple">
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
              <div className="flex items-center gap-2">
                <FileCode className="h-3.5 w-3.5 text-[oklch(0.85_0.18_200)]" />
                <span className="font-mono text-xs">solution.cpp</span>
                <span className="text-[10px] text-muted-foreground">· C++17</span>
              </div>
              <div className="flex items-center gap-1.5">
                {members.slice(0,3).map((m) => (
                  <div key={m.name} className="grid h-5 w-5 place-items-center rounded-full text-[8px] font-bold text-white border border-card"
                    style={{ background: m.color }}>
                    {m.name[0]}
                  </div>
                ))}
              </div>
            </div>
            <pre className="flex-1 overflow-auto bg-[oklch(0.1_0.02_270)] p-4 font-mono text-xs leading-6 scrollbar-thin">
              {codeLines.map((l) => (
                <div key={l.n} className="flex items-center group hover:bg-white/[0.02]">
                  <span className="select-none w-10 text-right pr-3 text-muted-foreground/50">{l.n}</span>
                  <span className={`flex-1 ${colorMap[l.c||""]||""}`}>{l.t || "\u00A0"}</span>
                  {l.marker && (
                    <span className="ml-2 rounded px-1.5 text-[9px] font-bold text-white"
                      style={{ background: markerColor[l.marker] }}>
                      {l.marker}
                    </span>
                  )}
                </div>
              ))}
            </pre>
            <div className="border-t border-border/50 bg-[oklch(0.1_0.02_270)] px-4 py-2 font-mono text-xs">
              <span className="text-muted-foreground">$ </span>
              <span className="text-[oklch(0.85_0.2_150)]">Test 14/14 passed</span>
              <span className="text-muted-foreground"> · 124ms · 8.2 MB</span>
            </div>
          </div>
        </main>

        {/* Right: AI + chat */}
        <aside className="col-span-12 md:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="holo-card p-4 glow-cyan">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="h-5 w-5 text-[oklch(0.85_0.18_200)]" />
                <Sparkles className="absolute -top-1 -right-1 h-2.5 w-2.5 text-[oklch(0.78_0.2_90)]" />
              </div>
              <h2 className="font-semibold text-sm">AI Copilot</h2>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">Nexus-7</span>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <div className="rounded-lg bg-[oklch(0.85_0.18_200/0.1)] border border-[oklch(0.85_0.18_200/0.3)] p-3">
                <p className="font-mono text-[10px] tracking-widest text-[oklch(0.85_0.18_200)] mb-1">ANALYSIS</p>
                <p className="leading-relaxed">Your dijkstra is correct & optimal. Time: O((N+M) log N).</p>
              </div>
              <div className="rounded-lg glass p-3">
                <p className="font-mono text-[10px] tracking-widest text-[oklch(0.78_0.2_90)] mb-1">EDGE CASE</p>
                <p className="leading-relaxed">Add reset of dist[] if multiple test cases. Watch for self-loops.</p>
              </div>
              <div className="rounded-lg glass p-3">
                <p className="font-mono text-[10px] tracking-widest text-[oklch(0.72_0.27_340)] mb-1">HINT</p>
                <p className="leading-relaxed">Output −1 needs special handling — guard against INT_MAX overflow.</p>
              </div>
            </div>
          </div>

          <div className="holo-card flex-1 flex flex-col p-4 min-h-0">
            <h2 className="font-semibold text-sm mb-3">Team chat</h2>
            <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin pr-1">
              {chat.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs"
                >
                  <p className="font-semibold" style={{ color: m.c }}>{m.who}</p>
                  <p className="mt-0.5 text-foreground/90 leading-relaxed">{m.txt}</p>
                </motion.div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!input.trim()) return;
                setChat([...chat, { who: "You", txt: input, c: "oklch(0.78 0.2 90)" }]);
                setInput("");
              }}
              className="mt-3 flex items-center gap-2 rounded-lg glass px-3 py-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message squad…"
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="grid h-7 w-7 place-items-center rounded-md bg-gradient-primary text-white">
                <Send className="h-3 w-3" />
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
