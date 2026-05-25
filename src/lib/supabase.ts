import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

class MockSupabaseClient {
  private listeners: Array<(event: string, session: any) => void> = [];
  private currentSession: any = null;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nexus_mock_session");
      if (stored) {
        try {
          this.currentSession = JSON.parse(stored);
        } catch (_) {}
      }
    }
  }

  auth = {
    getSession: async () => {
      return { data: { session: this.currentSession }, error: null };
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      this.listeners.push(callback);
      // Immediately invoke with current state
      setTimeout(() => {
        callback("INITIAL_SESSION", this.currentSession);
      }, 0);

      return {
        data: {
          subscription: {
            unsubscribe: () => {
              this.listeners = this.listeners.filter((l) => l !== callback);
            },
          },
        },
      };
    },
    signInWithPassword: async ({ email, password }: any) => {
      const user = {
        id: "mock-user-id",
        email: email || "guest@nexus.dev",
        user_metadata: {
          handle: email ? email.split("@")[0] : "guest",
          first_name: email ? email.split("@")[0] : "Guest",
          last_name: "User",
        },
      };
      const session = {
        access_token: "mock-token",
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "mock-refresh-token",
        user,
      };
      this.currentSession = session;
      if (typeof window !== "undefined") {
        localStorage.setItem("nexus_mock_session", JSON.stringify(session));
      }
      this.listeners.forEach((l) => l("SIGNED_IN", session));
      return { data: { user, session }, error: null };
    },
    signUp: async ({ email, password, options }: any) => {
      const metadata = options?.data || {};
      const user = {
        id: "mock-user-id-" + Math.random().toString(36).substring(2, 9),
        email: email,
        user_metadata: {
          handle: metadata.handle || email.split("@")[0],
          first_name: metadata.first_name || email.split("@")[0],
          last_name: metadata.last_name || "",
        },
      };
      const session = {
        access_token: "mock-token",
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "mock-refresh-token",
        user,
      };
      this.currentSession = session;
      if (typeof window !== "undefined") {
        localStorage.setItem("nexus_mock_session", JSON.stringify(session));
      }
      this.listeners.forEach((l) => l("SIGNED_IN", session));
      return { data: { user, session }, error: null };
    },
    signOut: async () => {
      this.currentSession = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("nexus_mock_session");
      }
      this.listeners.forEach((l) => l("SIGNED_OUT", null));
      return { error: null };
    },
  };
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : (new MockSupabaseClient() as any);

