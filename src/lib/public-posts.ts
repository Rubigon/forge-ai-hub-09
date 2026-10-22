import { createServerOnlyFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const readPublicPosts = createServerOnlyFn(async () => {
  const url =
    process.env["SUPABASE_URL"] ||
    (process.env["SUPABASE_PROJECT_ID"]
      ? `https://${process.env["SUPABASE_PROJECT_ID"]}.supabase.co`
      : undefined) ||
    process.env["VITE_SUPABASE_URL"];

  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

  // Si no existen credenciales, devolvemos un array vacío sin lanzar un error fatal
  if (!url || !key) {
    console.warn("Public article service: Missing credentials, returning fallback list.");
    return [];
  }

  try {
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data, error } = await client
      .from("posts")
      .select("id,title,slug,description,category,content,published,created_at,updated_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Public article service query error:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn("Public article service caught exception:", err);
    return [];
  }
});
