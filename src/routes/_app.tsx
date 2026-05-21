import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GridBackdrop } from "@/shared/components/layout/GridBackdrop";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <GridBackdrop />
      <Outlet />
    </div>
  );
}
