import { dashboardLeaderboard } from "@/features/dashboard/data/dashboard.mock";

function rankClass(rank: number) {
  if (rank === 1) return "text-neon-gold";
  if (rank === 2) return "text-neon-cyan";
  return "text-muted-foreground";
}

export function TeamLeaderboardPanel() {
  return (
    <div className="holo-card p-6">
      <h2 className="font-display text-lg font-semibold">Team leaderboard</h2>
      <div className="mt-5 space-y-2">
        {dashboardLeaderboard.map((t) => (
          <div key={t.rank} className="flex items-center justify-between rounded-lg glass px-3 py-2.5">
            <div className="flex items-center gap-3">
              <span className={`font-mono text-sm font-bold w-5 ${rankClass(t.rank)}`}>#{t.rank}</span>
              <span className="text-sm">{t.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono">{t.pts.toLocaleString()}</span>
              <span className={t.delta.startsWith("+") ? "text-status-success" : "text-status-danger"}>
                {t.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
