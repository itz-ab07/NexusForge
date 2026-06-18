import { Link } from "@tanstack/react-router";
import { Bell, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { useAuth } from "@/features/auth/context/AuthProvider";

export function DashboardHeader() {
  const { user } = useAuth();
  const { recentRooms, accounts } = useDashboardData();
  const displayName = user?.firstName ?? "there";

  const subtitle =
    recentRooms.length > 0
      ? `${recentRooms.length} recent room${recentRooms.length === 1 ? "" : "s"}`
      : accounts.codeforces || accounts.leetcode
        ? "Accounts connected · start a room to collaborate"
        : "Connect platforms and create a room to get started";

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-neon-cyan">
          // Welcome back, {displayName}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold">Command Center</h1>
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm hover:bg-white/5 transition"
            >
              <Bell className="h-4 w-4" /> Notifications
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="glass-strong border-border/50 bg-card text-foreground w-72"
          >
            <p className="text-sm font-medium">Notifications</p>
            <p className="mt-2 text-xs text-muted-foreground">No notifications yet</p>
          </PopoverContent>
        </Popover>
        <Link
          to="/room"
          search={{ id: Math.random().toString(36).substring(2, 10) }}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-medium glow-purple hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" /> New room
        </Link>
      </div>
    </div>
  );
}
