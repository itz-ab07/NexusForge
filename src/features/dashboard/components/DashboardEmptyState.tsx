import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export function DashboardEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionTo,
  actionSearch,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel: string;
  onAction?: () => void;
  actionTo?: string;
  actionSearch?: Record<string, string>;
}) {
  const actionClassName =
    "inline-flex items-center justify-center rounded-xl bg-gradient-primary px-4 py-2 text-xs font-semibold text-white glow-purple hover:opacity-90 transition";

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-xl glass border border-white/10 mb-4">
        <Icon className="h-5 w-5 text-neon-cyan" />
      </div>
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="mt-1 max-w-xs text-xs text-muted-foreground leading-relaxed">{description}</p>}
      <div className="mt-4">
        {actionTo ? (
          <Link to={actionTo} search={actionSearch} className={actionClassName}>
            {actionLabel}
          </Link>
        ) : (
          <button type="button" onClick={onAction} className={actionClassName}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
