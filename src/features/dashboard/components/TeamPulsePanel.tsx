import { Users, Zap } from "lucide-react";
import { DashboardEmptyState } from "@/features/dashboard/components/DashboardEmptyState";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";

export function TeamPulsePanel() {
  const { recentRooms } = useDashboardData();

  return (
    <div className="holo-card p-6">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-neon-gold" />
        <h2 className="font-display text-lg font-semibold">Team pulse</h2>
      </div>

      {recentRooms.length === 0 ? (
        <DashboardEmptyState
          icon={Users}
          title="No team data yet"
          description="Join a live room with teammates to track collaboration metrics."
          actionLabel="Create your first room"
          actionTo="/room"
          actionSearch={{ id: Math.random().toString(36).substring(2, 10) }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl glass border border-white/10 mb-4">
            <Zap className="h-5 w-5 text-neon-gold" />
          </div>
          <p className="text-sm font-medium">Metrics not available</p>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground leading-relaxed">
            Team performance analytics will appear after your squad completes sessions together.
          </p>
        </div>
      )}
    </div>
  );
}
