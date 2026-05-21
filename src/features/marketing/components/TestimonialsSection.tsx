import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/features/marketing/data/landing";

export function TestimonialsSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-neon-cyan">
            // Trusted by champions
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            From classroom to ICPC World Finals.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="holo-card p-6"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-neon-cyan text-neon-cyan" />
                ))}
              </div>
              <p className="text-sm leading-relaxed">"{t.q}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border/50 pt-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-white">
                  {t.a.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.a}</p>
                  <p className="text-xs text-muted-foreground">{t.r}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
