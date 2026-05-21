import { Link } from "@tanstack/react-router";
import { ChevronLeft, Circle, Hash, Play, Settings } from "lucide-react";

export function RoomHeader() {
  return (
    <header className="glass-strong border-b border-border/50 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/5 transition">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-neon-cyan" />
            <h1 className="font-display font-semibold">graph-algorithms-drill</h1>
            <span className="rounded-full bg-status-live-soft px-2 py-0.5 text-[10px] text-status-live flex items-center gap-1">
              <Circle className="h-1.5 w-1.5 fill-current" /> LIVE
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">Quantum Bytes · 4 active</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-xl glass px-4 py-2 font-mono text-sm">
          <span className="text-muted-foreground">Contest </span>
          <span className="text-neon-cyan font-semibold">02:47:18</span>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-medium glow-purple hover:opacity-90 transition"
        >
          <Play className="h-3.5 w-3.5" /> Run
        </button>
        <button type="button" className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/5 transition">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
