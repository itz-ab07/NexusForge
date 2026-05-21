import { Trophy, Users } from "lucide-react";
import { dashboardContests } from "@/features/dashboard/data/dashboard.mock";

export function UpcomingContestsPanel() {
  return (
    <div className="holo-card p-6 lg:col-span-2">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Upcoming contests</h2>
        <Trophy className="h-4 w-4 text-neon-gold" />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {dashboardContests.map((c) => (
          <div key={c.name} className="rounded-xl glass p-4 hover:bg-white/5 transition cursor-pointer">
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="mt-1 text-xs text-muted-foreground font-mono">{c.date}</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-3 w-3" /> {c.teams}
              </span>
              <span className="rounded-full bg-neon-purple-badge px-2 py-0.5 text-neon-cyan">{c.rank}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
