import { redirect } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/** Redirect authenticated users away from guest-only routes (login/signup). */
export async function requireGuest(): Promise<void> {
  if (typeof window === "undefined") return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    throw redirect({ to: "/dashboard" });
  }
}

/**
 * Ensure a Supabase session exists (client navigations).
 * SSR defers to AuthProvider + route component guard.
 */
export async function requireAuth(redirectTo = "/login"): Promise<Session | null> {
  if (typeof window === "undefined") return null;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw redirect({
      to: redirectTo,
      search: { redirect: window.location.pathname },
    });
  }

  return session;
}
