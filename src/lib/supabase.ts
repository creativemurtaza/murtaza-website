import { createClient } from "@supabase/supabase-js";
import { createBrowserClient as createSSRBrowserClient, createServerClient as createSSRServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createBrowserSupabase() {
  return createSSRBrowserClient(supabaseUrl, supabaseAnonKey);
}

export function createServerSupabase(cookieStore: {
  getAll: () => { name: string; value: string }[];
  setAll: (cookies: { name: string; value: string; options?: object }[]) => void;
}) {
  return createSSRServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookieStore.setAll(cookiesToSet);
      },
    },
  });
}
