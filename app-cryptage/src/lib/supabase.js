import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
 console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
 console.log('KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
 throw new Error('Variables d\'environnement Supabase manquantes')
}

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export { supabase }