export function GridBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg animated-grid opacity-60" />
      <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl" />
      <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-[oklch(0.72_0.2_240/0.25)] blur-3xl animate-float" />
      <div
        className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[oklch(0.68_0.25_300/0.2)] blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.13_0.02_270)_100%)]" />
    </div>
  );
}

export function Particles({ count = 24 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const dur = 6 + (i % 6);
        const delay = (i % 5) * 0.7;
        const size = 2 + (i % 4);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-neon-cyan opacity-70 animate-float"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              boxShadow: "0 0 12px oklch(0.85 0.18 200 / 0.9)",
            }}
          />
        );
      })}
    </div>
  );
}
