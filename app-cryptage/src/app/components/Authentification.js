'use client'
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Authentification() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        
        if (error) throw error;
        
        setSuccess("Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception.");
        setEmail('');
        setPassword('');
        
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        setSuccess("Connexion réussie !");
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1500);
      }
    } catch (error) {
      let message = "Une erreur est survenue";
      if (error.message.includes('Email not confirmed')) {
        message = "Veuillez confirmer votre email avant de vous connecter";
      } else if (error.message.includes('Invalid login credentials')) {
        message = "Email ou mot de passe incorrect";
      } else if (error.message.includes('Email already registered')) {
        message = "Cet email est déjà utilisé";
      } else if (error.message.includes('Password should be')) {
        message = "Le mot de passe doit contenir au moins 6 caractères";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            {isSignUp ? 'Créer un compte' : 'Se connecter'}
          </h2>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white border-gray-600"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-900/50 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-sm text-green-500 bg-green-900/50 rounded-md">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Chargement...' : (isSignUp ? 'S\'inscrire' : 'Se connecter')}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setSuccess(null);
            }}
            className="text-sm text-blue-400 hover:underline"
          >
            {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
          </button>
        </div>
      </div>
    </div>
  );
}