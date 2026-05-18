import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/components/cyber/AuthShell";
import { Github, Chrome } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Nexus.dev" }] }),
  component: Login,
});

function Login() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Nexus workspace"
      footer={<>New to Nexus? <Link to="/signup" className="text-[oklch(0.85_0.18_200)] hover:underline">Create an account</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <AuthInput label="Email" type="email" placeholder="you@nexus.dev" />
        <div>
          <AuthInput label="Password" type="password" placeholder="••••••••" />
          <Link to="/forgot-password" className="mt-2 block text-right text-xs text-muted-foreground hover:text-foreground transition">
            Forgot password?
          </Link>
        </div>
        <AuthButton>Sign in</AuthButton>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
          <span className="relative flex justify-center"><span className="bg-card px-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Or continue with</span></span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[{ I: Github, n: "GitHub" }, { I: Chrome, n: "Google" }].map(({ I, n }) => (
            <button key={n} type="button" className="inline-flex items-center justify-center gap-2 rounded-xl glass px-4 py-2.5 text-sm hover:bg-white/5 transition">
              <I className="h-4 w-4" /> {n}
            </button>
          ))}
        </div>
      </form>
    </AuthShell>
  );
}
