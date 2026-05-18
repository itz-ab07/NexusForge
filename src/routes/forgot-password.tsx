import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/components/cyber/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Nexus.dev" }] }),
  component: Forgot,
});

function Forgot() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send a recovery link to your inbox"
      footer={<>Remembered it? <Link to="/login" className="text-[oklch(0.85_0.18_200)] hover:underline">Back to sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <AuthInput label="Email" type="email" placeholder="you@nexus.dev" />
        <AuthButton>Send recovery link</AuthButton>
      </form>
    </AuthShell>
  );
}
