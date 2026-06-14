import { Link } from "@tanstack/react-router";
import { ChevronLeft, Circle, Hash, Play, Settings, Share2, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BACKEND_URL } from "@/shared/constants/config";


export function RoomHeader({
  code,
  input,
  language = "cpp",
  roomId,
  joined,
  setOutput,
  setLoading,
}: {
  code: string;
  input: string;
  language?: string;
  roomId?: string;
  joined?: boolean;
  setOutput: (v: string) => void;
  setLoading: (v: boolean) => void;
}) {
  const [copying, setCopying] = useState(false);

  const handleRun = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BACKEND_URL}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          input,
          language,
        }),
      });

      const data = await res.json();
      setOutput(data.output);
    } catch (err) {
      setOutput("Execution failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyInvite = async () => {
    if (!roomId) {
      toast.error("Please join or create a room first!");
      return;
    }
    
    try {
      setCopying(true);
      const inviteUrl = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(roomId)}`;
      await navigator.clipboard.writeText(inviteUrl);
      
      toast.success("Invite Link Copied!", {
        description: "Share it with your teammates to code together.",
        className: "bg-surface-input border-neon-cyan-soft text-white",
      });
    } catch (err) {
      toast.error("Failed to copy link. Please copy the URL manually!");
    } finally {
      setTimeout(() => setCopying(false), 2000);
    }
  };

  return (
    <header className="glass-strong border-b border-border/50 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/5 transition">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-neon-cyan" />
            <h1 className="font-display font-semibold tracking-wide">
              {joined && roomId ? `room-${roomId}` : "Nexus Sandbox"}
            </h1>
            <span className={`rounded-full px-2 py-0.5 text-[10px] flex items-center gap-1 font-semibold ${
              joined
                ? "bg-status-live-soft text-status-live animate-pulse-glow"
                : "bg-white/5 border border-white/10 text-muted-foreground"
            }`}>
              <Circle className={`h-1.5 w-1.5 ${joined ? "fill-current" : "bg-muted-foreground rounded-full"}`} />
              {joined ? "LIVE" : "SANDBOX"}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">
            {joined ? "Real-time CP Collaboration Active" : "Connect to a room to collaborate"}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {joined && roomId && (
          <button
            type="button"
            onClick={handleCopyInvite}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neon-cyan/20 bg-neon-cyan-soft/10 px-3.5 py-2 text-xs font-semibold text-neon-cyan cursor-pointer transition hover:bg-neon-cyan-soft/20 glow-cyan"
          >
            {copying ? <Copy className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            Invite Teammate
          </button>
        )}
        
        <div className="rounded-xl glass px-4 py-2 font-mono text-sm border border-white/5">
          <span className="text-muted-foreground text-xs">Timer </span>
          <span className="text-neon-cyan font-semibold">01:30:00</span>
        </div>
        
        <button
          type="button"
          onClick={handleRun}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-white glow-purple hover:opacity-90 transition cursor-pointer"
        >
          <Play className="h-3.5 w-3.5" /> Run
        </button>
        
        <button type="button" className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/5 transition cursor-pointer">
          <Settings className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
      </div>
    </header>
  );
}

