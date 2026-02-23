import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client.
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY which is never exposed to the browser.
 * This prevents bots from extracting credentials and inserting directly
 * into the database, bypassing our spam checks.
 *
 * Falls back to the public anon key if the service role key is not configured.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Prefer service role key; fall back to anon key for backwards compatibility
const key = serviceRoleKey || anonKey;

export const supabaseServer: SupabaseClient | null =
  supabaseUrl && key
    ? createClient(supabaseUrl, key, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;

// Log which key is in use (for debugging, no secrets exposed)
if (supabaseUrl && serviceRoleKey) {
  // Service role key in use — secure
} else if (supabaseUrl && anonKey) {
  console.warn(
    'SUPABASE_SERVICE_ROLE_KEY not set — using public anon key. ' +
    'Set SUPABASE_SERVICE_ROLE_KEY in your environment variables for secure server-only access.'
  );
}
