import { Link } from "@tanstack/react-router";
import { Code2 } from "lucide-react";
import { GridBackdrop, Particles } from "./GridBackdrop";

export function AuthShell({
  title, subtitle, children, footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="dark min-h-screen bg-background text-foreground relative flex items-center justify-center px-4 py-12">
      <GridBackdrop />
      <div className="absolute inset-0 overflow-hidden pointer-events-none"><Particles count={18} /></div>

      <div className="w-full max-w-md relative">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary glow-purple">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold">NEXUS<span className="text-gradient">.dev</span></span>
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
    </div>
  );
}

export function AuthInput({
  label, type = "text", placeholder,
}: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-[oklch(0.13_0.02_270)] border border-border px-4 py-3 text-sm outline-none transition focus:border-[oklch(0.7_0.22_285)] focus:ring-2 focus:ring-[oklch(0.7_0.22_285/0.3)] placeholder:text-muted-foreground/60"
      />
    </label>
  );
}

export function AuthButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="w-full rounded-xl bg-gradient-primary px-4 py-3 text-sm font-medium text-white glow-purple hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}
