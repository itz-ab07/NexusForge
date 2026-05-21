import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/features/marketing/components/LandingPage";

export const Route = createFileRoute("/_marketing/")({
  head: () => ({
    meta: [
      { title: "Nexus.dev — Realtime collaborative competitive programming" },
      {
        name: "description",
        content:
          "AI-powered live coding rooms for ICPC teams. Code together, learn together, win together.",
      },
    ],
  }),
  component: LandingPage,
});
