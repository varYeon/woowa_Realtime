import { Database } from "@/utils/supabase/supabase";

export type Message = Database["public"]["Tables"]["messages"]["Row"];
