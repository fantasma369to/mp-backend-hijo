import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
const supabaseAlejandria = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
export default supabaseAlejandria;
