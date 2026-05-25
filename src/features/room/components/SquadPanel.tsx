import { Mic, MicOff, Users, Video, VideoOff } from "lucide-react";
import { NEON_COLORS } from "@/shared/constants/neon";
import { roomMembers } from "@/features/room/data/room.mock";

export function SquadPanel({
  users = [],
  myInfo,
  onMicToggle,
  onVideoToggle,
}: {
  users?: any[];
  myInfo?: any;
  onMicToggle?: (mic: boolean) => void;
  onVideoToggle?: (video: boolean) => void;
}) {
  const isDemo = users.length === 0;
  
  // Use live users if connected, otherwise fallback to premium mock room members
  const displayMembers = isDemo
    ? roomMembers.map((m) => ({
        socketId: "demo",
        username: m.name,
        color: m.color,
        role: m.role,
        status: m.status,
        mic: m.mic,
        video: false,
        isCFLinked: true,
        cfRating: 1842,
      }))
    : users;

  const handleMicClick = () => {
    if (onMicToggle && myInfo) {
      onMicToggle(!myInfo.mic);
    }
  };

  const handleVideoClick = () => {
    if (onVideoToggle && myInfo) {
      onVideoToggle(!myInfo.video);
    }
  };

  return (
    <aside className="col-span-12 md:col-span-2 holo-card p-4 overflow-y-auto scrollbar-thin flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-neon-cyan" />
            <h2 className="font-semibold text-sm">Squad</h2>
          </div>
          {isDemo && (
            <span className="text-[9px] bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-muted-foreground uppercase font-mono tracking-widest">
              Demo
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          {displayMembers.map((m, idx) => {
            const isMe = myInfo && m.socketId === myInfo.socketId;
            const initials = m.username
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();

            return (
              <div
                key={m.socketId + "-" + idx}
                className={`rounded-lg glass p-2.5 transition border ${
                  isMe ? "border-neon-cyan/40 bg-neon-cyan-soft/10" : "border-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div
                      className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white font-display"
                      style={{
                        background: `linear-gradient(135deg, ${m.color || NEON_COLORS.purple}, ${NEON_COLORS.cyan})`,
                      }}
                    >
                      {initials}
                    </div>
                    <span
                      className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card animate-pulse-glow"
                      style={{
                        background: m.status === "idle" ? NEON_COLORS.idle : NEON_COLORS.live,
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate flex items-center gap-1.5">
                      {m.username}
                      {isMe && <span className="text-[9px] text-neon-cyan font-mono">(You)</span>}
                    </p>
                    <p className="text-[10px] text-muted-foreground capitalize">
                      {m.role || "Coder"} · {m.status || "online"}
                    </p>
                    
                    {/* Competitive programming ratings placeholder - will populate dynamically in Stage 8 */}
                    {m.cfRating && (
                      <p className="text-[9px] text-neon-gold font-mono font-semibold mt-0.5">
                        CF: {m.cfRating}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1.5 items-end justify-center">
                    {m.mic ? (
                      <Mic className="h-3.5 w-3.5 text-status-success" />
                    ) : (
                      <MicOff className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    {m.video && (
                      <Video className="h-3.5 w-3.5 text-status-success" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-lg glass p-3 border border-white/5">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Local Controls</p>
        
        {isDemo ? (
          <div className="text-[10px] text-muted-foreground font-mono mt-2 bg-black/20 p-2 rounded border border-white/5 leading-relaxed">
            Join a live room to activate your voice & video controls!
          </div>
        ) : (
          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={handleMicClick}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-semibold cursor-pointer transition ${
                myInfo?.mic
                  ? "bg-status-live-btn text-status-live glow-cyan"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10"
              }`}
            >
              {myInfo?.mic ? (
                <>
                  <Mic className="h-3.5 w-3.5" /> Mic On
                </>
              ) : (
                <>
                  <MicOff className="h-3.5 w-3.5" /> Muted
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleVideoClick}
              className={`grid h-8 w-8 place-items-center rounded-md cursor-pointer transition ${
                myInfo?.video
                  ? "bg-status-live-btn text-status-live glow-cyan border border-transparent"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10"
              }`}
            >
              {myInfo?.video ? <Video className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
