import { createClient } from "jsr:@supabase/supabase-js@2";

const supabaseUrl = "https://xaunigbyukgdqmpexsio.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_KEY");

export const supClient = createClient(supabaseUrl, supabaseKey || "", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
    debug: false,
  },
});
