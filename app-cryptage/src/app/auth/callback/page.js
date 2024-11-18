'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');
        
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          
          alert('Email confirmé avec succès ! Vous allez être redirigé vers la page d\'accueil.');
          
          // Utilisons window.location pour une redirection complète
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Erreur lors de la confirmation:', error);
        alert('Une erreur est survenue lors de la confirmation de votre email.');
        window.location.href = '/authentification';
      }
    };

    handleCallback();
  }, []);

  // Affichons quelque chose pendant le traitement
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Traitement en cours...</h2>
      </div>
    </div>
  );
}