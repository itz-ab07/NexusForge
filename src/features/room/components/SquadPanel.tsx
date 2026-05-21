import { Mic, MicOff, Users, Video } from "lucide-react";
import { NEON_COLORS } from "@/shared/constants/neon";
import { roomMembers } from "@/features/room/data/room.mock";

export function SquadPanel() {
  return (
    <aside className="col-span-12 md:col-span-2 holo-card p-4 overflow-y-auto scrollbar-thin">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-4 w-4 text-neon-cyan" />
        <h2 className="font-semibold text-sm">Squad</h2>
      </div>
      <div className="space-y-2">
        {roomMembers.map((m) => (
          <div key={m.name} className="rounded-lg glass p-2.5">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div
                  className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${m.color}, ${NEON_COLORS.cyan})`,
                  }}
                >
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card animate-pulse-glow"
                  style={{
                    background: m.status === "idle" ? NEON_COLORS.idle : NEON_COLORS.live,
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{m.name}</p>
                <p className="text-[10px] text-muted-foreground capitalize">
                  {m.role} · {m.status}
                </p>
              </div>
              {m.mic ? (
                <Mic className="h-3 w-3 text-status-success" />
              ) : (
                <MicOff className="h-3 w-3 text-muted-foreground" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg glass p-3">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Voice Room</p>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-status-live-btn py-1.5 text-xs text-status-live"
          >
            <Mic className="h-3 w-3" /> On
          </button>
          <button type="button" className="grid h-7 w-7 place-items-center rounded-md glass">
            <Video className="h-3 w-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}
