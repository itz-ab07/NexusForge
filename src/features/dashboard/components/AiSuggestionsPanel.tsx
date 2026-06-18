import { Bot } from "lucide-react";
import { DashboardEmptyState } from "@/features/dashboard/components/DashboardEmptyState";

export function AiSuggestionsPanel() {
  return (
    <div className="holo-card p-6">
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-neon-cyan" />
        <h2 className="font-display text-lg font-semibold">AI suggestions</h2>
      </div>

      <DashboardEmptyState
        icon={Bot}
        title="No suggestions yet"
        description="Start coding in a live room to receive AI-powered practice recommendations."
        actionLabel="Create your first room"
        actionTo="/room"
        actionSearch={{ id: Math.random().toString(36).substring(2, 10) }}
      />
    </div>
  );
}
