import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://grizjjjmhwpftuhpgyls.supabase.co"
const supabaseKey = "sb_publishable_auFyCoqarvQFNZVu_5rgJw_P3uuJagf"

export const supabase = createClient(supabaseUrl, supabaseKey)