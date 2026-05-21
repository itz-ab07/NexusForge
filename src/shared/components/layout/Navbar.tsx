import { Link, useNavigate } from "@tanstack/react-router";
import { Code2, Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/features/auth/context/AuthProvider";
import { getAuthErrorMessage } from "@/features/auth/lib/errors";

export function Navbar() {
  const { isAuthenticated, isLoading, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setLogoutError(null);
    setIsSigningOut(true);
    try {
      await signOut();
      await navigate({ to: "/" });
    } catch (error) {
      setLogoutError(getAuthErrorMessage(error));
    } finally {
      setIsSigningOut(false);
    }
  }

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
          <a href="#features" className="hover:text-foreground transition">
            Features
          </a>
          <a href="#showcase" className="hover:text-foreground transition">
            Showcase
          </a>
          <a href="#pricing" className="hover:text-foreground transition">
            Pricing
          </a>
          <Link to="/dashboard" className="hover:text-foreground transition">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {isLoading ? (
            <span className="inline-flex h-9 w-24 items-center justify-center rounded-xl glass">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-label="Loading" />
            </span>
          ) : isAuthenticated ? (
            <>
              {user ? (
                <span className="hidden md:inline text-xs font-mono text-muted-foreground truncate max-w-[140px]">
                  {user.firstName}
                </span>
              ) : null}
              <Link
                to="/dashboard"
                className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition px-3 py-2"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => void handleSignOut()}
                disabled={isSigningOut}
                className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2 text-sm font-medium hover:bg-white/5 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSigningOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition px-3 py-2"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center rounded-xl bg-gradient-primary px-4 py-2 text-sm font-medium text-white glow-purple hover:opacity-90 transition"
              >
                Launch app
              </Link>
            </>
          )}
        </div>
        {logoutError ? (
          <p className="absolute top-full right-4 mt-1 text-xs text-destructive" role="alert">
            {logoutError}
          </p>
        ) : null}
      </div>
    </header>
  );
}
