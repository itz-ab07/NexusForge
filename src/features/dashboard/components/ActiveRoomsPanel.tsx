import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Code2, DoorOpen } from "lucide-react";
import { DashboardEmptyState } from "@/features/dashboard/components/DashboardEmptyState";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { formatRelativeTime, languageLabel } from "@/features/dashboard/lib/dashboard-storage";
import { NEON_COLORS } from "@/shared/constants/neon";

const roomColors = [NEON_COLORS.purple, NEON_COLORS.cyan, NEON_COLORS.pink, NEON_COLORS.blue];

function withAlpha(color: string, alpha: number) {
  return color.replace(/\)$/, ` / ${alpha})`);
}

export function ActiveRoomsPanel() {
  const { recentRooms } = useDashboardData();

  return (
    <div className="holo-card p-6 lg:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Active rooms</h2>
          <p className="text-xs text-muted-foreground">Jump back into your live sessions</p>
        </div>
        {recentRooms.length > 0 && (
          <span className="text-xs text-muted-foreground font-mono">{recentRooms.length} recent</span>
        )}
      </div>

      {recentRooms.length === 0 ? (
        <DashboardEmptyState
          icon={DoorOpen}
          title="No rooms yet"
          description="Create a collaborative session or join one with an invite link."
          actionLabel="Create your first room"
          actionTo="/room"
          actionSearch={{ id: Math.random().toString(36).substring(2, 10) }}
        />
      ) : (
        <div className="mt-5 space-y-3">
          {recentRooms.map((r, index) => {
            const color = roomColors[index % roomColors.length];
            return (
              <Link
                key={r.id}
                to="/room"
                search={{ id: r.id }}
                className="flex items-center justify-between rounded-xl glass px-4 py-3.5 hover:bg-white/5 transition group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-lg"
                    style={{
                      background: withAlpha(color, 0.2),
                      border: `1px solid ${withAlpha(color, 0.5)}`,
                    }}
                  >
                    <Code2 className="h-4 w-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">room-{r.id}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {languageLabel(r.language)} · joined {formatRelativeTime(r.joinedAt)} ago
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
