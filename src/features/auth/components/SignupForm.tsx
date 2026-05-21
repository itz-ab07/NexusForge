import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { getAuthErrorMessage } from "@/features/auth/lib/errors";
import { AuthShell, AuthInput, AuthButton } from "@/features/auth/components/AuthShell";
import { AuthMessage } from "@/features/auth/components/AuthMessage";

export function SignupForm() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    const normalizedHandle = handle.trim().replace(/^@/, "");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          first_name: firstName.trim(),
          handle: normalizedHandle,
        },
      },
    });

    setIsLoading(false);

    if (signUpError) {
      setError(getAuthErrorMessage(signUpError));
      return;
    }

    if (data.session) {
      await navigate({ to: "/dashboard" });
      return;
    }

    setSuccess("Account created. Check your email to confirm your address, then sign in.");
  }

  return (
    <AuthShell
      title="Create your workspace"
      subtitle="Start coding with your team in 30 seconds"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-link-accent hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {error ? <AuthMessage message={error} /> : null}
        {success ? <AuthMessage message={success} variant="success" /> : null}

        <div className="grid grid-cols-2 gap-3">
          <AuthInput
            label="First name"
            name="firstName"
            placeholder="Aria"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            required
          />
          <AuthInput
            label="Handle"
            name="handle"
            placeholder="@aria"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            disabled={isLoading}
          />
        </div>
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
        <AuthInput
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
          minLength={8}
        />

        <div className="rounded-lg glass p-3 text-xs text-muted-foreground">
          By creating an account you agree to our{" "}
          <a href="#" className="text-link-accent hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-link-accent hover:underline">
            Privacy
          </a>
          .
        </div>

        <AuthButton isLoading={isLoading}>
          {isLoading ? "Creating workspace…" : "Create workspace"}
        </AuthButton>
      </form>
    </AuthShell>
  );
}
