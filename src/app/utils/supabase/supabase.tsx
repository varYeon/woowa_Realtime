import { createClient } from "@supabase/supabase-js";

console.log("🔑 URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("🔑 KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 10));

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
  {
    auth: {
      persistSession: false,
    },
  }
);
