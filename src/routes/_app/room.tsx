import { createFileRoute } from "@tanstack/react-router";
import { RoomPage } from "@/features/room/components/RoomPage";
import { z } from "zod";

const roomSearchSchema = z.object({
  id: z.string().optional(),
});

export const Route = createFileRoute("/_app/room")({
  validateSearch: roomSearchSchema,
  head: () => ({ meta: [{ title: "Live Room — Nexus.dev" }] }),
  component: RoomPage,
});

