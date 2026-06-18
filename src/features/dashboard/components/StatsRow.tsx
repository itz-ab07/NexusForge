import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Flame, Target, TrendingUp, Trophy } from "lucide-react";
import { ConnectAccountButton } from "@/features/dashboard/components/ConnectAccountButton";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { NEON_COLORS } from "@/shared/constants/neon";

type StatKey = "rating" | "solved" | "streak" | "wins";

const statConfig: Record<
  StatKey,
  {
    label: string;
    icon: typeof TrendingUp;
    color: string;
    textClass: string;
    emptyHint: (accounts) => ReactNode;
  }
> = {
  rating: {
    label: "Rating",
    icon: TrendingUp,
    color: NEON_COLORS.cyan,
    textClass: "text-neon-cyan",
    emptyHint: (accounts) => (
      <ConnectAccountButton platform="codeforces" connectedHandle={accounts.codeforces} />
    ),
  },
  solved: {
    label: "Solved",
    icon: Target,
    color: NEON_COLORS.purple,
    textClass: "text-syntax-purple",
    emptyHint: (accounts) => (
      <ConnectAccountButton platform="leetcode" connectedHandle={accounts.leetcode} />
    ),
  },
  streak: {
    label: "Streak",
    icon: Flame,
    color: NEON_COLORS.pink,
    textClass: "text-neon-pink",
    emptyHint: () => <span className="text-muted-foreground">Practice in a room to build a streak</span>,
  },
  wins: {
    label: "Wins",
    icon: Trophy,
    color: NEON_COLORS.gold,
    textClass: "text-neon-gold",
    emptyHint: (accounts) =>
      accounts.codeforces ? (
        <span className="text-muted-foreground">Contest stats sync coming soon</span>
      ) : (
        <ConnectAccountButton platform="codeforces" connectedHandle={accounts.codeforces} />
      ),
  },
};

const statOrder: StatKey[] = ["rating", "solved", "streak", "wins"];

export function StatsRow() {
  const { accounts } = useDashboardData();

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statOrder.map((key, i) => {
        const config = statConfig[key];
        const Icon = config.icon;
        const connected =
          (key === "rating" || key === "wins") && accounts.codeforces
            ? accounts.codeforces
            : key === "solved" && accounts.leetcode
              ? accounts.leetcode
              : null;

        return (
          <motion.div
            key={config.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="holo-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{config.label}</span>
              <Icon className={`h-4 w-4 ${config.textClass}`} />
            </div>
            <p className={`mt-3 font-display text-3xl font-bold ${connected ? config.textClass : "text-muted-foreground"}`}>
              —
            </p>
            <p className="mt-1 text-xs">{config.emptyHint(accounts)}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
