export function ProblemPanel() {
  return (
    <div className="holo-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-neon-cyan">Problem D · 1500 pts</p>
          <h3 className="mt-1 font-display text-lg font-semibold">Shortest Path Through the Grid</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Given a weighted DAG with N ≤ 2·10⁵ nodes and M ≤ 5·10⁵ edges, find the shortest path from node 1 to
            every other node. Output −1 for unreachable nodes.
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-muted-foreground">Submissions</p>
          <p className="font-mono text-sm">3 / 50</p>
          <p className="text-xs text-status-success mt-1">2 AC</p>
        </div>
      </div>
    </div>
  );
}
