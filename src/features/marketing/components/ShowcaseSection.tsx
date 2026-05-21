import { Check } from "lucide-react";
import { showcaseTeams } from "@/features/marketing/data/landing";

const showcaseHighlights = [
  "Realtime ICPC scoreboard",
  "Custom problem packs",
  "Voice rooms & emoji reactions",
  "AI replay analysis",
] as const;

export function ShowcaseSection() {
  return (
    <section id="showcase" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-neon-cyan">// Live Contest</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Run rounds your team will remember.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Spin up an ICPC-style contest in seconds. Live scoreboard, balloons, replay
            timeline and AI post-mortems for every team.
          </p>
          <ul className="mt-8 space-y-3">
            {showcaseHighlights.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-neon-purple-badge border border-neon-purple-ring">
                  <Check className="h-3 w-3 text-neon-cyan" />
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
              <span className="text-neon-cyan">02:47:18</span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {showcaseTeams.map((t) => (
              <div key={t.rank} className="flex items-center justify-between rounded-lg glass px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold w-6" style={{ color: t.color }}>
                    #{t.rank}
                  </span>
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
  );
}
