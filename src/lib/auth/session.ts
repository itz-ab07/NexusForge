/**
 * @deprecated Use Supabase auth via `useAuth()` and `@/lib/supabase` instead.
 * Kept for backward compatibility with earlier stubs.
 */

import { supabase } from "@/lib/supabase";
import { mapSupabaseUser } from "@/features/auth/lib/map-user";
import type { Session, User } from "@/types";

export async function getSession(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return null;

  return {
    user: mapSupabaseUser(session.user),
    accessToken: session.access_token,
    expiresAt: new Date((session.expires_at ?? 0) * 1000).toISOString(),
  };
}

export async function clearSession(): Promise<void> {
  await supabase.auth.signOut();
}

export async function isAuthenticated(): Promise<boolean> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return Boolean(session);
}
