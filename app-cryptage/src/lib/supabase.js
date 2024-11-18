import { createClient } from '@supabase/supabase-js'

let supabase;

try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Variables d\'environnement Supabase manquantes')
    }

    supabase = createClient(supabaseUrl, supabaseKey)
} catch (error) {
    console.error('Erreur lors de l\'initialisation de Supabase:', error)
    // En développement, on pourrait vouloir arrêter l'application
    if (process.env.NODE_ENV === 'development') {
        throw error
    }
    // En production, on crée un client vide qui échouera silencieusement
    supabase = createClient('', '')
}

export { supabase }