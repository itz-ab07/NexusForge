import { FileCode } from "lucide-react";
import {
  roomCodeLines,
  roomColorMap,
  roomMarkerColor,
  roomMembers,
} from "@/features/room/data/room.mock";

export function CodeEditorPanel() {
  return (
    <div className="holo-card flex-1 flex flex-col overflow-hidden glow-purple">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <FileCode className="h-3.5 w-3.5 text-neon-cyan" />
          <span className="font-mono text-xs">solution.cpp</span>
          <span className="text-[10px] text-muted-foreground">· C++17</span>
        </div>
        <div className="flex items-center gap-1.5">
          {roomMembers.slice(0, 3).map((m) => (
            <div
              key={m.name}
              className="grid h-5 w-5 place-items-center rounded-full text-[8px] font-bold text-white border border-card"
              style={{ background: m.color }}
            >
              {m.name[0]}
            </div>
          ))}
        </div>
      </div>
      <pre className="flex-1 overflow-auto bg-surface-editor p-4 font-mono text-xs leading-6 scrollbar-thin">
        {roomCodeLines.map((l) => (
          <div key={l.n} className="flex items-center group hover:bg-white/[0.02]">
            <span className="select-none w-10 text-right pr-3 text-muted-foreground/50">{l.n}</span>
            <span className={`flex-1 ${roomColorMap[l.c || ""] || ""}`}>{l.t || "\u00A0"}</span>
            {l.marker && (
              <span
                className="ml-2 rounded px-1.5 text-[9px] font-bold text-white"
                style={{ background: roomMarkerColor[l.marker] }}
              >
                {l.marker}
              </span>
            )}
          </div>
        ))}
      </pre>
      <div className="border-t border-border/50 bg-surface-editor px-4 py-2 font-mono text-xs">
        <span className="text-muted-foreground">$ </span>
        <span className="text-status-success">Test 14/14 passed</span>
        <span className="text-muted-foreground"> · 124ms · 8.2 MB</span>
      </div>
    </div>
  );
}
