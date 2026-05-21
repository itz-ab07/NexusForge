import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { User } from "@/types";

export function mapSupabaseUser(user: SupabaseUser): User {
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const rawHandle = typeof meta?.handle === "string" ? meta.handle : "";
  const handle = rawHandle.startsWith("@") ? rawHandle : rawHandle ? `@${rawHandle}` : "@user";
  const firstName =
    typeof meta?.first_name === "string"
      ? meta.first_name
      : (user.email?.split("@")[0] ?? "User");

  return {
    id: user.id,
    email: user.email ?? "",
    handle,
    firstName,
    lastName: typeof meta?.last_name === "string" ? meta.last_name : undefined,
  };
}
