import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) { // On a ajouté un test pour vérifier si les accès étaient présent
  throw new Error("Il manque les codes d'accès à la base de donné Supabase ( API et URL )");
}

export const supabase = createClient(supabaseUrl, supabaseKey)