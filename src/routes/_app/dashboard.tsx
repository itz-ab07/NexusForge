import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthProvider";
import { requireAuth } from "@/features/auth/lib/guards";
import { AuthLoadingScreen } from "@/features/auth/components/AuthLoadingScreen";
import { DashboardPage } from "@/features/dashboard/components/DashboardPage";
import { AppShell } from "@/shared/components/layout/AppShell";

export const Route = createFileRoute("/_app/dashboard")({
  beforeLoad: () => requireAuth(),
  head: () => ({ meta: [{ title: "Dashboard — Nexus.dev" }] }),
  component: DashboardRoute,
});

function DashboardRoute() {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void navigate({
        to: "/login",
        search: { redirect: "/dashboard" },
      });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <AppShell showNavbar>
        <AuthLoadingScreen />
      </AppShell>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell showNavbar>
      <DashboardPage />
    </AppShell>
  );
}
