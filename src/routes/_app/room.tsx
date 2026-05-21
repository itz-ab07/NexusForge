import { createFileRoute } from "@tanstack/react-router";
import { RoomPage } from "@/features/room/components/RoomPage";

export const Route = createFileRoute("/_app/room")({
  head: () => ({ meta: [{ title: "Live Room — Nexus.dev" }] }),
  component: RoomPage,
});
