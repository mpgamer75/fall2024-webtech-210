'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   try {
     if (!supabase?.auth) {
       console.error('Supabase client not properly initialized');
       setLoading(false);
       return;
     }

     const initAuth = async () => {
       try {
         const { data: { session } } = await supabase.auth.getSession();
         setUser(session?.user ?? null);
       } catch (error) {
         console.error('Auth initialization error:', error);
       } finally {
         setLoading(false);
       }
     };

     initAuth();

     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
       setUser(session?.user ?? null);
     });

     return () => subscription?.unsubscribe();
   } catch (error) {
     console.error('Auth provider error:', error);
     setLoading(false);
   }
 }, []);

 return (
   <AuthContext.Provider value={{ user, loading }}>
     {!loading && children}
   </AuthContext.Provider>
 );
}

export const useAuth = () => useContext(AuthContext);