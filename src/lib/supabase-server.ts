// Server-only Supabase helpers. Filename `*.server.ts` is blocked from client bundles.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export function createPublishableServerClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "placeholder-key";

  if (url === "https://placeholder.supabase.co" || key === "placeholder-key") {
    console.warn("[Supabase] Environment variables missing on server, using placeholder client for graceful fallback.");
  }

  return createClient<Database>(
    url,
    key,
    {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    },
  );
}
