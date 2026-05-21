import { NEON_COLORS } from "@/shared/constants/neon";
import type { CodeLine } from "@/types";

export const roomMembers = [
  { name: "Aria Vance", role: "Captain", color: NEON_COLORS.purple, status: "coding", mic: true },
  { name: "Kenji Park", role: "Algo", color: NEON_COLORS.cyan, status: "thinking", mic: true },
  { name: "Mira Okafor", role: "DS", color: NEON_COLORS.pink, status: "idle", mic: false },
  { name: "Ravi Kumar", role: "DP", color: NEON_COLORS.gold, status: "coding", mic: true },
] as const;

export const roomCodeLines = [
  { n: 1, t: "#include <bits/stdc++.h>", c: "purple" },
  { n: 2, t: "using namespace std;", c: "purple" },
  { n: 3, t: "" },
  { n: 4, t: "// Find shortest path in weighted DAG", c: "muted" },
  { n: 5, t: "int n, m;", c: "" },
  { n: 6, t: "vector<pair<int,int>> adj[200005];", c: "" },
  { n: 7, t: "vector<int> dist(200005, INT_MAX);", c: "" },
  { n: 8, t: "" },
  { n: 9, t: "void dijkstra(int src) {", c: "yellow", marker: "Aria" },
  { n: 10, t: "    priority_queue<pair<int,int>,", c: "" },
  { n: 11, t: "        vector<pair<int,int>>, greater<>> pq;", c: "" },
  { n: 12, t: "    dist[src] = 0;", c: "" },
  { n: 13, t: "    pq.push({0, src});", c: "" },
  { n: 14, t: "    while (!pq.empty()) {", c: "purple", marker: "Kenji" },
  { n: 15, t: "        auto [d, u] = pq.top(); pq.pop();", c: "" },
  { n: 16, t: "        if (d > dist[u]) continue;", c: "" },
  { n: 17, t: "        for (auto [v, w] : adj[u]) {", c: "purple" },
  { n: 18, t: "            if (dist[u] + w < dist[v]) {", c: "purple" },
  { n: 19, t: "                dist[v] = dist[u] + w;", c: "" },
  { n: 20, t: "                pq.push({dist[v], v});", c: "" },
  { n: 21, t: "            }", c: "" },
  { n: 22, t: "        }", c: "" },
  { n: 23, t: "    }", c: "" },
  { n: 24, t: "}", c: "" },
] satisfies CodeLine[];

export const roomColorMap: Record<string, string> = {
  purple: "text-syntax-purple",
  yellow: "text-syntax-yellow",
  cyan: "text-neon-cyan",
  pink: "text-neon-pink",
  muted: "text-muted-foreground",
};

export const roomMarkerColor: Record<string, string> = {
  Aria: NEON_COLORS.purple,
  Kenji: NEON_COLORS.cyan,
};

export const roomInitialChat = [
  { who: "Kenji", txt: "I'll handle the priority queue init", c: NEON_COLORS.cyan },
  { who: "Aria", txt: "Cool, I'll write the relax loop", c: NEON_COLORS.purple },
  { who: "AI", txt: "Heads up: line 16 prevents stale entries — good call.", c: NEON_COLORS.gold },
] as const;

export type RoomChatMessage = {
  who: string;
  txt: string;
  c: string;
};
