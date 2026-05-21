import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/features/auth/components/SignupForm";

export const Route = createFileRoute("/_auth/signup")({
  head: () => ({ meta: [{ title: "Create account — Nexus.dev" }] }),
  component: SignupForm,
});
