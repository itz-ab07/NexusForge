import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/components/cyber/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Nexus.dev" }] }),
  component: Signup,
});

function Signup() {
  return (
    <AuthShell
      title="Create your workspace"
      subtitle="Start coding with your team in 30 seconds"
      footer={<>Already have an account? <Link to="/login" className="text-[oklch(0.85_0.18_200)] hover:underline">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <AuthInput label="First name" placeholder="Aria" />
          <AuthInput label="Handle" placeholder="@aria" />
        </div>
        <AuthInput label="Email" type="email" placeholder="you@nexus.dev" />
        <AuthInput label="Password" type="password" placeholder="At least 8 characters" />

        <div className="rounded-lg glass p-3 text-xs text-muted-foreground">
          By creating an account you agree to our <a href="#" className="text-[oklch(0.85_0.18_200)] hover:underline">Terms</a> and <a href="#" className="text-[oklch(0.85_0.18_200)] hover:underline">Privacy</a>.
        </div>

        <AuthButton>Create workspace</AuthButton>
      </form>
    </AuthShell>
  );
}
