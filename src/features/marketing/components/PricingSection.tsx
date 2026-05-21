import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { pricingTiers } from "@/features/marketing/data/landing";

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-neon-cyan">// Pricing</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Choose your loadout.</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pricingTiers.map((t) => (
            <div
              key={t.name}
              className={`holo-card relative p-7 ${t.featured ? "glow-purple ring-1 ring-neon-purple-featured" : ""}`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-5xl font-bold text-gradient">
                  {t.price === "Custom" ? "Custom" : `$${t.price}`}
                </span>
                {t.price !== "Custom" && (
                  <span className="text-sm text-muted-foreground mb-2">/mo per user</span>
                )}
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-neon-cyan" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`mt-7 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                  t.featured
                    ? "bg-gradient-primary text-white glow-purple hover:opacity-90"
                    : "glass hover:bg-white/5"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
