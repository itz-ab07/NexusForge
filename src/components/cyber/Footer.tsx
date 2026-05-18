import { Link } from "@tanstack/react-router";
import { Code2, Github, Twitter, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary glow-purple">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold">NEXUS<span className="text-gradient">.dev</span></span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The collaborative coding platform for elite competitive programmers and engineering teams.
            </p>
            <div className="mt-5 flex gap-3">
              {[Github, Twitter, MessageSquare].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg glass hover:glow-cyan transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Product", links: ["Features", "Live Rooms", "AI Copilot", "Contests"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="hover:text-foreground transition">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground">
          <p>© 2026 Nexus Labs. Built for builders.</p>
          <p className="font-mono">v2.4.0 · all systems operational</p>
        </div>
      </div>
    </footer>
  );
}
