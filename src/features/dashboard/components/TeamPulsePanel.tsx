import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { NEON_COLORS } from "@/shared/constants/neon";
import { dashboardTeamPulse } from "@/features/dashboard/data/dashboard.mock";

export function TeamPulsePanel() {
  return (
    <div className="holo-card p-6">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-neon-gold" />
        <h2 className="font-display text-lg font-semibold">Team pulse</h2>
      </div>
      <div className="mt-6 space-y-4">
        {dashboardTeamPulse.map((m) => (
          <div key={m.name}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">{m.name}</span>
              <span className="font-mono font-semibold">{m.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-track overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${m.color}, ${NEON_COLORS.cyan})`,
                  boxShadow: `0 0 12px ${m.color}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
