import { motion } from "framer-motion";
import { Flame, Target, TrendingUp, Trophy } from "lucide-react";
import { dashboardStats, type DashboardStatKey } from "@/features/dashboard/data/dashboard.mock";

const statIcons: Record<DashboardStatKey, typeof TrendingUp> = {
  rating: TrendingUp,
  solved: Target,
  streak: Flame,
  wins: Trophy,
};

export function StatsRow() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((s, i) => {
        const Icon = statIcons[s.key];
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="holo-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
              <Icon className={`h-4 w-4 ${s.textClass}`} />
            </div>
            <p className={`mt-3 font-display text-3xl font-bold ${s.textClass}`}>{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
