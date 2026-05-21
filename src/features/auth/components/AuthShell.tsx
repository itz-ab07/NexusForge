import { Link } from "@tanstack/react-router";
import { Code2, Loader2 } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="w-full max-w-md relative z-10">
      <Link to="/" className="flex items-center justify-center gap-2 mb-8">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary glow-purple">
          <Code2 className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-xl font-bold">
          NEXUS<span className="text-gradient">.dev</span>
        </span>
      </Link>

      <div className="holo-card p-8 glow-purple">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="mt-8">{children}</div>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
    </div>
  );
}

type AuthInputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function AuthInput({ label, error, className, id, ...props }: AuthInputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block" htmlFor={inputId}>
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        id={inputId}
        className={cn(
          "mt-2 w-full rounded-xl bg-surface-input border border-border px-4 py-3 text-sm outline-none transition",
          "focus:border-[oklch(0.7_0.22_285)] focus:ring-2 focus:ring-[oklch(0.7_0.22_285/0.3)]",
          "placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-60",
          error && "border-destructive/60 focus:border-destructive focus:ring-destructive/30",
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </label>
  );
}

export function AuthButton({
  children,
  isLoading,
  disabled,
}: {
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className="w-full rounded-xl bg-gradient-primary px-4 py-3 text-sm font-medium text-white glow-purple hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-60 inline-flex items-center justify-center gap-2"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}
