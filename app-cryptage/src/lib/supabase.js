import { createClient } from '@supabase/supabase-js'

let supabase;

try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Les variables d\'environnement Supabase sont manquantes')
    
    supabase = createClient('', '')
  } else {
    supabase = createClient(supabaseUrl, supabaseKey)
  }
} catch (error) {
  console.error('Erreur lors de l\'initialisation de Supabase:', error)
  
  supabase = createClient('', '')
}

export { supabase }