import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="holo-card relative overflow-hidden p-12 text-center glow-purple">
          <div className="absolute inset-0 bg-gradient-primary opacity-20" />
          <div className="relative">
            <Sparkles className="mx-auto h-8 w-8 text-neon-cyan" />
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">Ready to climb the ranks?</h2>
            <p className="mt-4 text-muted-foreground">
              Join 38,000+ programmers already shipping faster on Nexus.
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 font-medium glow-purple hover:opacity-90 transition"
            >
              Create free workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
