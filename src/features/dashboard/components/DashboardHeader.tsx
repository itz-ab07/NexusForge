import { Link } from "@tanstack/react-router";
import { Bell, Plus } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthProvider";

export function DashboardHeader() {
  const { user } = useAuth();
  const displayName = user?.firstName ?? "there";

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-neon-cyan">
          // Welcome back, {displayName}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold">Command Center</h1>
        <p className="text-muted-foreground mt-1">3 rooms live · next contest in 2h 14m</p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm hover:bg-white/5 transition"
        >
          <Bell className="h-4 w-4" /> Notifications
        </button>
        <Link
          to="/room"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-medium glow-purple hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" /> New room
        </Link>
      </div>
    </div>
  );
}
