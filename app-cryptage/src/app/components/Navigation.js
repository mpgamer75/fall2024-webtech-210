'use client';

import { Search, Settings, Home, Lock, Unlock, BookOpen, Menu, LogIn, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { redirect } from 'next/dist/server/api-utils';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const links = [
    { href: '/', icon: Home, text: 'Accueil' },
    { href: '/encrypt', icon: Lock, text: 'Crypter' },
    { href: '/decrypt', icon: Unlock, text: 'Décrypter' },
    { href: '/blog', icon: BookOpen, text: 'Blog' },
  ];

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-600 text-white shadow-lg">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et Marque */}
          <div className="flex items-center">
            <img
              src="/logo-app3.png"
              alt="Logo"
              className="h-8 w-auto transform transition-all duration-300 hover:scale-110"
            />
            <span
              className="ml-2 font-bold text-xl md:text-2xl bg-gradient-to-r from-red-800 to-white 
                bg-clip-text text-transparent transform transition-all duration-300 
                hover:tracking-wider hover:scale-105 cursor-pointer
                drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)]"
            >
              SABER
            </span>
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-red-800 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <div className="flex items-center space-x-4">
              {links.map(({ href, icon: Icon, text }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center space-x-2 px-3 py-2 rounded-md
                    hover:bg-red-800 transition-all duration-300
                    hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Icon size={20} className="transform transition-transform duration-300 group-hover:scale-110" />
                  <span className="transition-colors duration-300">{text}</span>
                </a>
              ))}
            </div>

            {/* Barre de recherche, paramètres et Connexion/Déconnexion */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-gray-500 text-white placeholder-gray-300 
                    px-4 py-2 rounded-md w-48
                    focus:outline-none focus:ring-2 focus:ring-white
                    transition-all duration-300
                    hover:bg-red-800 focus:bg-red-900"
                />
                <Search className="absolute right-3 top-2.5 text-orange-200 pointer-events-none" size={20} />
              </div>

              {/* Indicateur de connexion et menu utilisateur */}
              {user && (
                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-700">
                  <User size={20} className="text-green-400" />
                  <span className="text-sm text-gray-200 hidden lg:block">
                    {user.email}
                  </span>
                </div>
              )}

              <a
                href="/settings"
                className="group flex items-center space-x-2 px-3 py-2 rounded-md
                  hover:bg-red-800 transition-all duration-300
                  hover:shadow-lg hover:-translate-y-0.5"
              >
                <Settings size={20} className="transform transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-colors duration-300 hidden lg:inline">Paramètres</span>
              </a>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-md bg-red-600 hover:bg-red-800 text-white
                    font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  <LogOut size={20} className="mr-2" />
                  Déconnexion
                </button>
              ) : (
                <a
                  href="/authentification"
                  className="flex items-center px-4 py-2 rounded-md bg-gray-600 hover:bg-red-800 text-white
                    font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  <LogIn size={20} className="mr-2" />
                  Connexion
                </a>
              )}
            </div>
          </div>

          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-600 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Indicateur de connexion mobile */}
                {user && (
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-700 mb-2">
                    <User size={20} className="text-green-400" />
                    <span className="text-sm text-gray-200">{user.email}</span>
                  </div>
                )}
                
                {links.map(({ href, icon: Icon, text }) => (
                  <a
                    key={href}
                    href={href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-800 
                      text-white transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{text}</span>
                  </a>
                ))}

                <a
                  href="/settings"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-800 
                    text-white transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings size={20} />
                  <span>Paramètres</span>
                </a>

                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center px-3 py-2 rounded-md bg-red-600 hover:bg-red-800 
                      text-white transition-all duration-300"
                  >
                    <LogOut size={20} className="mr-2" />
                    Déconnexion
                  </button>
                ) : (
                  <a
                    href="/authentification"
                    className="flex items-center px-3 py-2 rounded-md bg-gray-600 hover:bg-red-800 
                      text-white transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={20} className="mr-2" />
                    Connexion
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;