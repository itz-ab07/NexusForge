import { Bot, Sparkles } from "lucide-react";

export function CopilotPanel() {
  return (
    <div className="holo-card p-4 glow-cyan">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Bot className="h-5 w-5 text-neon-cyan" />
          <Sparkles className="absolute -top-1 -right-1 h-2.5 w-2.5 text-neon-gold" />
        </div>
        <h2 className="font-semibold text-sm">AI Copilot</h2>
        <span className="ml-auto text-[10px] font-mono text-muted-foreground">Nexus-7</span>
      </div>
      <div className="mt-4 space-y-3 text-xs">
        <div className="rounded-lg bg-neon-cyan-soft border border-neon-cyan-soft p-3">
          <p className="font-mono text-[10px] tracking-widest text-neon-cyan mb-1">ANALYSIS</p>
          <p className="leading-relaxed">Your dijkstra is correct & optimal. Time: O((N+M) log N).</p>
        </div>
        <div className="rounded-lg glass p-3">
          <p className="font-mono text-[10px] tracking-widest text-neon-gold mb-1">EDGE CASE</p>
          <p className="leading-relaxed">Add reset of dist[] if multiple test cases. Watch for self-loops.</p>
        </div>
        <div className="rounded-lg glass p-3">
          <p className="font-mono text-[10px] tracking-widest text-neon-pink mb-1">HINT</p>
          <p className="leading-relaxed">Output −1 needs special handling — guard against INT_MAX overflow.</p>
        </div>
      </div>
    </div>
  );
}
