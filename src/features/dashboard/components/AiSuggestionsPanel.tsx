import { Bot } from "lucide-react";
import { dashboardAiSuggestions } from "@/features/dashboard/data/dashboard.mock";

export function AiSuggestionsPanel() {
  return (
    <div className="holo-card p-6">
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-neon-cyan" />
        <h2 className="font-display text-lg font-semibold">AI suggestions</h2>
      </div>
      <div className="mt-5 space-y-3">
        {dashboardAiSuggestions.map((s) => (
          <div key={s.tag} className="rounded-lg glass p-3">
            <span className={`font-mono text-[10px] tracking-widest ${s.textClass}`}>{s.tag}</span>
            <p className="mt-1 text-sm leading-snug">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
