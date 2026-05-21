import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GridBackdrop } from "@/shared/components/layout/GridBackdrop";
import { Navbar } from "@/shared/components/layout/Navbar";

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
});

function MarketingLayout() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <GridBackdrop />
      <Navbar />
      <Outlet />
    </div>
  );
}
