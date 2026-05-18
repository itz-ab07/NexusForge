import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, Users, Bot, Zap, Trophy, Terminal, Globe, Shield,
  ArrowRight, Check, Activity, Cpu, GitBranch, Star,
} from "lucide-react";
import { GridBackdrop, Particles } from "@/components/cyber/GridBackdrop";
import { Navbar } from "@/components/cyber/Navbar";
import { Footer } from "@/components/cyber/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexus.dev — Realtime collaborative competitive programming" },
      { name: "description", content: "AI-powered live coding rooms for ICPC teams. Code together, learn together, win together." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Users, title: "Realtime Co-coding", desc: "Multiplayer cursors, shared selection, sub-50ms sync. Like Google Docs for code.", color: "neon-purple" },
  { icon: Bot, title: "AI Copilot", desc: "In-context hints, complexity analysis and bug detection trained on 1M+ contest problems.", color: "neon-cyan" },
  { icon: Trophy, title: "Live Contests", desc: "Spin up team rounds with ICPC-style scoreboard, penalties and replay timeline.", color: "neon-blue" },
  { icon: Terminal, title: "VS Code Editor", desc: "Monaco-powered editor with 40+ languages, vim mode and intelligent autocomplete.", color: "neon-purple" },
  { icon: Globe, title: "Global Judge", desc: "Edge sandboxes in 14 regions. Sub-second verdicts on 200+ problem sets.", color: "neon-cyan" },
  { icon: Shield, title: "Team Workspace", desc: "Voice rooms, channels, problem boards. Discord-grade collaboration built in.", color: "neon-blue" },
];

const tiers = [
  { name: "Solo", price: "0", desc: "For individuals starting out", features: ["Public rooms", "Basic AI hints", "5 contests/mo", "Community"], cta: "Start free" },
  { name: "Squad", price: "19", desc: "For competitive teams", features: ["Private team rooms", "Advanced AI copilot", "Unlimited contests", "Voice & video", "Priority judge"], cta: "Go Squad", featured: true },
  { name: "Federation", price: "Custom", desc: "Universities & orgs", features: ["SSO + SAML", "Custom problem sets", "Coach dashboard", "On-prem judge", "Dedicated support"], cta: "Talk to us" },
];

function Landing() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <GridBackdrop />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-32">
        <Particles count={20} />
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.85_0.18_200)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.85_0.18_200)]" />
            </span>
            <span className="text-muted-foreground">v2.4 · AI Copilot now powered by Nexus-7</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
          >
            Code together.<br />
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
            <Link to="/signup" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-medium glow-purple hover:opacity-90 transition">
              Launch your team
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/room" className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 font-medium hover:bg-white/5 transition">
              <Activity className="h-4 w-4 text-[oklch(0.85_0.18_200)]" />
              Watch live demo
            </Link>
          </motion.div>

          {/* Hero showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative mx-auto mt-20 max-w-5xl"
          >
            <div className="absolute -inset-x-10 -top-10 -bottom-10 bg-gradient-primary opacity-30 blur-3xl" />
            <div className="holo-card relative p-2 glow-purple">
              <div className="rounded-xl bg-[oklch(0.1_0.02_270)] p-4 font-mono text-xs md:text-sm">
                <div className="flex items-center gap-2 pb-3 border-b border-border/50">
                  <span className="h-3 w-3 rounded-full bg-[oklch(0.65_0.25_25)]" />
                  <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.18_85)]" />
                  <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.18_150)]" />
                  <span className="ml-3 text-muted-foreground">graph_traversal.cpp</span>
                  <span className="ml-auto flex items-center gap-2">
                    {["A","K","M","R"].map((u, i) => (
                      <span key={u} className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: `linear-gradient(135deg, oklch(0.7 0.22 ${280 + i*20}), oklch(0.6 0.2 ${230 + i*20}))`}}>
                        {u}
                      </span>
                    ))}
                    <span className="ml-1 rounded-full bg-[oklch(0.7_0.18_150/0.2)] px-2 py-0.5 text-[10px] text-[oklch(0.85_0.2_150)]">4 live</span>
                  </span>
                </div>
                <pre className="mt-4 overflow-x-auto text-left leading-relaxed">
<span className="text-muted-foreground">  1</span>  <span className="text-[oklch(0.7_0.22_285)]">#include</span> <span className="text-[oklch(0.85_0.18_200)]">&lt;bits/stdc++.h&gt;</span>{"\n"}
<span className="text-muted-foreground">  2</span>  <span className="text-[oklch(0.7_0.22_285)]">using</span> namespace std;{"\n"}
<span className="text-muted-foreground">  3</span>{"\n"}
<span className="text-muted-foreground">  4</span>  <span className="text-[oklch(0.7_0.22_285)]">vector</span>&lt;<span className="text-[oklch(0.85_0.18_200)]">int</span>&gt; <span className="text-[oklch(0.78_0.18_85)]">dijkstra</span>(<span className="text-[oklch(0.85_0.18_200)]">int</span> src, <span className="text-[oklch(0.85_0.18_200)]">int</span> n) {"{"}{"\n"}
<span className="text-muted-foreground">  5</span>    priority_queue&lt;pair&lt;<span className="text-[oklch(0.85_0.18_200)]">int</span>,<span className="text-[oklch(0.85_0.18_200)]">int</span>&gt;&gt; pq;{"\n"}
<span className="text-muted-foreground">  6</span>    vector&lt;<span className="text-[oklch(0.85_0.18_200)]">int</span>&gt; dist(n, INT_MAX);{"\n"}
<span className="text-muted-foreground">  7</span>    dist[src] = <span className="text-[oklch(0.72_0.27_340)]">0</span>;{"\n"}
<span className="text-muted-foreground">  8</span>    pq.push({"{"}<span className="text-[oklch(0.72_0.27_340)]">0</span>, src{"}"});{"\n"}
<span className="text-muted-foreground">  9</span>    <span className="text-[oklch(0.7_0.22_285)]">while</span> (!pq.empty()) {"{"} <span className="rounded bg-[oklch(0.7_0.22_285/0.25)] px-1">| Aria</span>{"\n"}
                </pre>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-[oklch(0.7_0.22_285/0.1)] border border-[oklch(0.7_0.22_285/0.4)] p-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-[oklch(0.85_0.18_200)]" />
                    <span className="text-xs text-foreground">AI: Use a min-heap with negated values, or <code className="text-[oklch(0.85_0.18_200)]">greater&lt;&gt;</code>. Time: O((V+E) log V).</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Nexus-7</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* trust strip */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-x-10 gap-y-3 text-xs text-muted-foreground">
            {["MIT", "ETH Zürich", "Tsinghua", "ITMO", "Stanford", "IIT Bombay"].map((u) => (
              <span key={u} className="font-mono tracking-widest opacity-70">// {u}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-[oklch(0.85_0.18_200)]">// Capabilities</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Built for elite teams</h2>
            <p className="mt-4 text-muted-foreground">Every layer engineered for the speed of competitive coding.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="holo-card group p-6 hover:-translate-y-1 transition"
              >
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.7_0.22_285/0.15)] border border-[oklch(0.7_0.22_285/0.3)] group-hover:glow-purple transition">
                  <f.icon className="h-5 w-5 text-[oklch(0.85_0.18_200)]" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[oklch(0.85_0.18_200)]">// Live Contest</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Run rounds your team will remember.</h2>
            <p className="mt-5 text-muted-foreground">
              Spin up an ICPC-style contest in seconds. Live scoreboard, balloons, replay
              timeline and AI post-mortems for every team.
            </p>
            <ul className="mt-8 space-y-3">
              {["Realtime ICPC scoreboard", "Custom problem packs", "Voice rooms & emoji reactions", "AI replay analysis"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[oklch(0.7_0.22_285/0.2)] border border-[oklch(0.7_0.22_285/0.5)]">
                    <Check className="h-3 w-3 text-[oklch(0.85_0.18_200)]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="holo-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-mono">ROUND 14 · LIVE</p>
                <h3 className="mt-1 font-display text-xl font-semibold">Quantum Open · Finals</h3>
              </div>
              <div className="rounded-lg glass px-3 py-2 font-mono text-sm">
                <span className="text-[oklch(0.85_0.18_200)]">02:47:18</span>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              {[
                { rank: 1, name: "Quantum Bytes", score: 1247, problems: "ABCDE", color: "oklch(0.78 0.2 90)" },
                { rank: 2, name: "Hex Wraiths",   score: 1189, problems: "ABCD",  color: "oklch(0.85 0.18 200)" },
                { rank: 3, name: "Null Pointers", score: 1102, problems: "ABCD",  color: "oklch(0.7 0.22 285)" },
                { rank: 4, name: "Recursive",     score: 989,  problems: "ABC",   color: "oklch(0.72 0.27 340)" },
              ].map((t) => (
                <div key={t.rank} className="flex items-center justify-between rounded-lg glass px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold w-6" style={{ color: t.color }}>#{t.rank}</span>
                    <span className="font-medium">{t.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-mono text-muted-foreground">{t.problems}</span>
                    <span className="font-mono font-semibold text-foreground">{t.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-[oklch(0.85_0.18_200)]">// Trusted by champions</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">From classroom to ICPC World Finals.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { q: "Nexus changed how our team trains. The AI feedback is sharper than most coaches.", a: "Aria Vance", r: "Captain · MIT Quantum Bytes" },
              { q: "We replaced 4 tools with Nexus. Voice + editor + judge in one place is a cheat code.", a: "Kenji Park", r: "Coach · Tsinghua A" },
              { q: "Our regional rank jumped 38 spots after one season. The replays are gold.", a: "Mira Okafor", r: "Lead · ETH Zürich" },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="holo-card p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-[oklch(0.85_0.18_200)] text-[oklch(0.85_0.18_200)]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">"{t.q}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border/50 pt-4">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-white">
                    {t.a.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.a}</p>
                    <p className="text-xs text-muted-foreground">{t.r}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-[oklch(0.85_0.18_200)]">// Pricing</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Choose your loadout.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`holo-card relative p-7 ${t.featured ? "glow-purple ring-1 ring-[oklch(0.7_0.22_285/0.6)]" : ""}`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="font-display text-5xl font-bold text-gradient">
                    {t.price === "Custom" ? "Custom" : `$${t.price}`}
                  </span>
                  {t.price !== "Custom" && <span className="text-sm text-muted-foreground mb-2">/mo per user</span>}
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[oklch(0.85_0.18_200)]" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`mt-7 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                    t.featured
                      ? "bg-gradient-primary text-white glow-purple hover:opacity-90"
                      : "glass hover:bg-white/5"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="holo-card relative overflow-hidden p-12 text-center glow-purple">
            <div className="absolute inset-0 bg-gradient-primary opacity-20" />
            <div className="relative">
              <Sparkles className="mx-auto h-8 w-8 text-[oklch(0.85_0.18_200)]" />
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">Ready to climb the ranks?</h2>
              <p className="mt-4 text-muted-foreground">Join 38,000+ programmers already shipping faster on Nexus.</p>
              <Link to="/signup" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 font-medium glow-purple hover:opacity-90 transition">
                Create free workspace <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
