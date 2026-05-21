import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireGuest } from "@/features/auth/lib/guards";
import { GridBackdrop, Particles } from "@/shared/components/layout/GridBackdrop";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => requireGuest(),
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="dark min-h-screen bg-background text-foreground relative flex items-center justify-center px-4 py-12">
      <GridBackdrop />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Particles count={18} />
      </div>
      <Outlet />
    </div>
  );
}
