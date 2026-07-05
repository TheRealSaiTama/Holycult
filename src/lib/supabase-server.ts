// Server-only Supabase helpers. Filename `*.server.ts` is blocked from client bundles.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export function createPublishableServerClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    const missing = [
      ...(!url ? ['SUPABASE_URL or VITE_SUPABASE_URL'] : []),
      ...(!key ? ['SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_PUBLISHABLE_KEY'] : []),
    ];
    throw new Error(`Missing Supabase environment variable(s): ${missing.join(', ')}`);
  }

  return createClient<Database>(
    url,
    key,
    {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    },
  );
}
