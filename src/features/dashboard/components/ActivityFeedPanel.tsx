import { Activity } from "lucide-react";
import { DashboardEmptyState } from "@/features/dashboard/components/DashboardEmptyState";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { formatRelativeTime } from "@/features/dashboard/lib/dashboard-storage";

export function ActivityFeedPanel() {
  const { activity } = useDashboardData();

  return (
    <div className="holo-card p-6 lg:col-span-2">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-neon-cyan" />
        <h2 className="font-display text-lg font-semibold">Activity feed</h2>
      </div>

      {activity.length === 0 ? (
        <DashboardEmptyState
          icon={Activity}
          title="No activity yet"
          description="Your room joins and collaboration events will appear here."
          actionLabel="Create your first room"
          actionTo="/room"
          actionSearch={{ id: Math.random().toString(36).substring(2, 10) }}
        />
      ) : (
        <div className="mt-5 space-y-3">
          {activity.map((a, i) => (
            <div key={`${a.at}-${i}`} className="flex items-center gap-3 text-sm">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-[10px] font-bold text-white">
                {a.who
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <p className="flex-1">
                <span className="font-medium">{a.who}</span>{" "}
                <span className="text-muted-foreground">{a.what}</span> <span>{a.subj}</span>
              </p>
              <span className="text-xs text-muted-foreground font-mono">{formatRelativeTime(a.at)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
