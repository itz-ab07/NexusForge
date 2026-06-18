import { Trophy } from "lucide-react";
import { ConnectAccountButton } from "@/features/dashboard/components/ConnectAccountButton";
import { DashboardEmptyState } from "@/features/dashboard/components/DashboardEmptyState";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";

export function UpcomingContestsPanel() {
  const { accounts } = useDashboardData();

  return (
    <div className="holo-card p-6 lg:col-span-2">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Upcoming contests</h2>
        <Trophy className="h-4 w-4 text-neon-gold" />
      </div>

      {accounts.codeforces ? (
        <DashboardEmptyState
          icon={Trophy}
          title="No contests loaded"
          description={`@${accounts.codeforces} is connected. Contest sync will appear here once available.`}
          actionLabel="View on Codeforces"
          onAction={() => {
            window.open(`https://codeforces.com/profile/${accounts.codeforces}`, "_blank", "noopener,noreferrer");
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl glass border border-white/10 mb-4">
            <Trophy className="h-5 w-5 text-neon-gold" />
          </div>
          <p className="text-sm font-medium">No upcoming contests</p>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground leading-relaxed">
            Connect your competitive programming account to see scheduled contests.
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
