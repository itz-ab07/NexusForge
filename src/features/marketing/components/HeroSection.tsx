import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Bot } from "lucide-react";
import { trustUniversities } from "@/features/marketing/data/landing";
import { Particles } from "@/shared/components/layout/GridBackdrop";

export function HeroSection() {
  return (
    <section className="relative pt-40 pb-32">
      <Particles count={20} />
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
          </span>
          <span className="text-muted-foreground">v2.4 · AI Copilot now powered by Nexus-7</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
        >
          Code together.
          <br />
          <span className="shimmer-text">Win together.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          The realtime collaborative competitive programming platform. AI copilot,
          ICPC-grade contests and a VS Code editor — fused into one cyber workspace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-medium glow-purple hover:opacity-90 transition"
          >
            Launch your team
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </Link>
          <Link
            to="/room"
            className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 font-medium hover:bg-white/5 transition"
          >
            <Activity className="h-4 w-4 text-neon-cyan" />
            Watch live demo
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="absolute -inset-x-10 -top-10 -bottom-10 bg-gradient-primary opacity-30 blur-3xl" />
          <div className="holo-card relative p-2 glow-purple">
            <div className="rounded-xl bg-surface-editor p-4 font-mono text-xs md:text-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-border/50">
                <span className="h-3 w-3 rounded-full bg-traffic-red" />
                <span className="h-3 w-3 rounded-full bg-traffic-yellow" />
                <span className="h-3 w-3 rounded-full bg-traffic-green" />
                <span className="ml-3 text-muted-foreground">graph_traversal.cpp</span>
                <span className="ml-auto flex items-center gap-2">
                  {["A", "K", "M", "R"].map((u, i) => (
                    <span
                      key={u}
                      className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, oklch(0.7 0.22 ${280 + i * 20}), oklch(0.6 0.2 ${230 + i * 20}))`,
                      }}
                    >
                      {u}
                    </span>
                  ))}
                  <span className="ml-1 rounded-full bg-status-live-soft px-2 py-0.5 text-[10px] text-status-live">
                    4 live
                  </span>
                </span>
              </div>
              <pre className="mt-4 overflow-x-auto text-left leading-relaxed">
                <span className="text-muted-foreground">  1</span>{" "}
                <span className="text-syntax-purple">#include</span>{" "}
                <span className="text-neon-cyan">&lt;bits/stdc++.h&gt;</span>
                {"\n"}
                <span className="text-muted-foreground">  2</span>{" "}
                <span className="text-syntax-purple">using</span> namespace std;{"\n"}
                <span className="text-muted-foreground">  3</span>
                {"\n"}
                <span className="text-muted-foreground">  4</span>{" "}
                <span className="text-syntax-purple">vector</span>&lt;
                <span className="text-neon-cyan">int</span>&gt;{" "}
                <span className="text-syntax-yellow">dijkstra</span>(
                <span className="text-neon-cyan">int</span> src,{" "}
                <span className="text-neon-cyan">int</span> n) {"{"}
                {"\n"}
                <span className="text-muted-foreground">  5</span>{" "}
                priority_queue&lt;pair&lt;
                <span className="text-neon-cyan">int</span>,
                <span className="text-neon-cyan">int</span>&gt;&gt; pq;{"\n"}
                <span className="text-muted-foreground">  6</span> vector&lt;
                <span className="text-neon-cyan">int</span>&gt; dist(n, INT_MAX);{"\n"}
                <span className="text-muted-foreground">  7</span> dist[src] ={" "}
                <span className="text-neon-pink">0</span>;{"\n"}
                <span className="text-muted-foreground">  8</span> pq.push({"{"}
                <span className="text-neon-pink">0</span>, src{"}"});{"\n"}
                <span className="text-muted-foreground">  9</span>{" "}
                <span className="text-syntax-purple">while</span> (!pq.empty()) {"{"}{" "}
                <span className="rounded bg-syntax-marker px-1">| Aria</span>
                {"\n"}
              </pre>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-neon-purple-soft border border-neon-purple-strong p-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-neon-cyan" />
                  <span className="text-xs text-foreground">
                    AI: Use a min-heap with negated values, or{" "}
                    <code className="text-neon-cyan">greater&lt;&gt;</code>. Time: O((V+E) log V).
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">Nexus-7</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-wrap justify-center items-center gap-x-10 gap-y-3 text-xs text-muted-foreground">
          {trustUniversities.map((u) => (
            <span key={u} className="font-mono tracking-widest opacity-70">
              // {u}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
