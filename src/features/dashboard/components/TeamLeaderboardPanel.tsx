import { Medal } from "lucide-react";
import { ConnectAccountButton } from "@/features/dashboard/components/ConnectAccountButton";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";

export function TeamLeaderboardPanel() {
  const { accounts } = useDashboardData();

  return (
    <div className="holo-card p-6">
      <h2 className="font-display text-lg font-semibold">Team leaderboard</h2>

      {accounts.codeforces ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl glass border border-white/10 mb-4">
            <Medal className="h-5 w-5 text-neon-gold" />
          </div>
          <p className="text-sm font-medium">No leaderboard data</p>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground leading-relaxed">
            @{accounts.codeforces} is connected. Team rankings will appear here once available.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl glass border border-white/10 mb-4">
            <Medal className="h-5 w-5 text-neon-gold" />
          </div>
          <p className="text-sm font-medium">No team rankings yet</p>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground leading-relaxed">
            Connect Codeforces to track team standings across contests.
          </p>
          <div className="mt-4">
            <ConnectAccountButton
              platform="codeforces"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-primary px-4 py-2 text-xs font-semibold text-white glow-purple hover:opacity-90 transition"
            />
          </div>
        </div>
      )}
    </div>
  );
}
