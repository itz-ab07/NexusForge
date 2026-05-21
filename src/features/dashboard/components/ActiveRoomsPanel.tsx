import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Code2 } from "lucide-react";
import { dashboardRooms } from "@/features/dashboard/data/dashboard.mock";

function withAlpha(color: string, alpha: number) {
  return color.replace(/\)$/, ` / ${alpha})`);
}

export function ActiveRoomsPanel() {
  return (
    <div className="holo-card p-6 lg:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Active rooms</h2>
          <p className="text-xs text-muted-foreground">Jump back into your live sessions</p>
        </div>
        <button type="button" className="text-xs text-neon-cyan hover:underline">
          View all
        </button>
      </div>
      <div className="mt-5 space-y-3">
        {dashboardRooms.map((r) => (
          <Link
            key={r.name}
            to="/room"
            className="flex items-center justify-between rounded-xl glass px-4 py-3.5 hover:bg-white/5 transition group"
          >
            <div className="flex items-center gap-4">
              <div
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{
                  background: withAlpha(r.color, 0.2),
                  border: `1px solid ${withAlpha(r.color, 0.5)}`,
                }}
              >
                <Code2 className="h-4 w-4" style={{ color: r.color }} />
              </div>
              <div>
                <p className="font-medium text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {r.lang} · {r.members} members
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {r.live && (
                <span className="flex items-center gap-1.5 text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success-ping opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success-ping" />
                  </span>
                  <span className="text-status-live">Live</span>
                </span>
              )}
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
