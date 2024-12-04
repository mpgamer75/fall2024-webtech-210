import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/*console.log('Environnement:', process.env.NODE_ENV)
console.log('Variables Supabase:', {
  url: !!supabaseUrl,
  key: !!supabaseKey,
  fullUrl: supabaseUrl,
  fullKey: supabaseKey?.substring(0, 10) + '...'
})*/

// Pour Docker 

if(!supabaseUrl || !supabaseKey){
  throw new Error('Variables d\'environnement Supabase manquantes');
}

export const supabase = createClient(supabaseUrl, supabaseKey)