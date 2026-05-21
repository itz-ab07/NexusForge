import { Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/features/auth/components/AuthShell";

export function ForgotPasswordForm() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send a recovery link to your inbox"
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="text-link-accent hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <AuthInput label="Email" type="email" placeholder="you@nexus.dev" />
        <AuthButton>Send recovery link</AuthButton>
      </form>
    </AuthShell>
  );
}
