import { Link } from "@tanstack/react-router";
import { Code2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl glass-strong px-5 py-3 mx-4 md:mx-auto">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary glow-purple">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            NEXUS<span className="text-gradient">.dev</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#showcase" className="hover:text-foreground transition">Showcase</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          <Link to="/dashboard" className="hover:text-foreground transition">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition px-3 py-2">
            Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center rounded-xl bg-gradient-primary px-4 py-2 text-sm font-medium text-white glow-purple hover:opacity-90 transition"
          >
            Launch app
          </Link>
        </div>
      </div>
    </header>
  );
}
