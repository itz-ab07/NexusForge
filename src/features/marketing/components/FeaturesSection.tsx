import { motion } from "framer-motion";
import { marketingFeatures } from "@/features/marketing/data/landing";

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-neon-cyan">// Capabilities</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Built for elite teams</h2>
          <p className="mt-4 text-muted-foreground">
            Every layer engineered for the speed of competitive coding.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {marketingFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="holo-card group p-6 hover:-translate-y-1 transition"
              >
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-neon-purple-muted border border-neon-purple-soft group-hover:glow-purple transition">
                  <Icon className="h-5 w-5 text-neon-cyan" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
