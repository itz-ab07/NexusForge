import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { NEON_COLORS } from "@/shared/constants/neon";
import { roomInitialChat, type RoomChatMessage } from "@/features/room/data/room.mock";

export function TeamChatPanel() {
  const [chat, setChat] = useState<RoomChatMessage[]>([...roomInitialChat]);
  const [input, setInput] = useState("");

  return (
    <div className="holo-card flex-1 flex flex-col p-4 min-h-0">
      <h2 className="font-semibold text-sm mb-3">Team chat</h2>
      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin pr-1">
        {chat.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs"
          >
            <p className="font-semibold" style={{ color: m.c }}>
              {m.who}
            </p>
            <p className="mt-0.5 text-foreground/90 leading-relaxed">{m.txt}</p>
          </motion.div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          setChat([...chat, { who: "You", txt: input, c: NEON_COLORS.gold }]);
          setInput("");
        }}
        className="mt-3 flex items-center gap-2 rounded-lg glass px-3 py-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message squad…"
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
        />
        <button type="submit" className="grid h-7 w-7 place-items-center rounded-md bg-gradient-primary text-white">
          <Send className="h-3 w-3" />
        </button>
      </form>
    </div>
  );
}
