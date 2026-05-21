import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Github, Chrome } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getAuthErrorMessage } from "@/features/auth/lib/errors";
import { Route } from "@/routes/_auth/login";
import { AuthShell, AuthInput, AuthButton } from "@/features/auth/components/AuthShell";
import { AuthMessage } from "@/features/auth/components/AuthMessage";

export function LoginForm() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError(getAuthErrorMessage(signInError));
      return;
    }

    const redirectTo = redirect && redirect.startsWith("/") ? redirect : "/dashboard";

    await navigate({ to: redirectTo });
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Nexus workspace"
      footer={
        <>
          New to Nexus?{" "}
          <Link to="/signup" className="text-link-accent hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {error ? <AuthMessage message={error} /> : null}

        <AuthInput
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@nexus.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <div>
          <AuthInput
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <Link
            to="/forgot-password"
            className="mt-2 block text-right text-xs text-muted-foreground hover:text-foreground transition"
          >
            Forgot password?
          </Link>
        </div>
        <AuthButton isLoading={isLoading}>{isLoading ? "Signing in…" : "Sign in"}</AuthButton>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
          <span className="relative flex justify-center">
            <span className="bg-card px-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Or continue with
            </span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[{ I: Github, n: "GitHub" }, { I: Chrome, n: "Google" }].map(({ I, n }) => (
            <button
              key={n}
              type="button"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl glass px-4 py-2.5 text-sm hover:bg-white/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <I className="h-4 w-4" /> {n}
            </button>
          ))}
        </div>
      </form>
    </AuthShell>
  );
}
