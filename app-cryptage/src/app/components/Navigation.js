'use client';

import {
  Search,
  Settings,
  Home,
  Lock,
  Unlock,
  BookOpen,
  Menu,
  LogIn,
  LogOut,
  User,
  X as XIcon
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { getsuggestion_de_requetes, searchCryptoNews } from '../API/cryptopanicService';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const router = useRouter();

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

    const subscription = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      subscription.data?.subscription?.unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const newSuggestions = getsuggestion_de_requetes(value);
    setSuggestions(newSuggestions);
    setShowSuggestions(true);
  };

  const handleSearch = async (query) => {
    setShowSuggestions(false);
    setSearchQuery(query);
    setIsSearchOpen(false);
    const results = await searchCryptoNews(query);
    setSearchResults(results);
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };
 
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);  
    if (isMenuOpen) setIsMenuOpen(false);  
    // Focus sur l'input de recherche après ouverture
    if (!isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  return (
    <nav className="bg-gray-600 text-white shadow-lg relative">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre */}
          <div className="flex items-center">
            <img
              src="/logo-app3.png"
              alt="Logo"
              className="h-8 w-auto transform transition-all duration-300 hover:scale-110"
            />
            <span className="ml-2 font-bold text-xl md:text-2xl bg-gradient-to-r from-red-800 to-white 
              bg-clip-text text-transparent transform transition-all duration-300 
              hover:tracking-wider hover:scale-105 cursor-pointer
              drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)]">
              SABER
            </span>
          </div>
  
          {/* Actions téléphone */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-md hover:bg-red-800 focus:outline-none transition-colors duration-300"
              aria-label="Recherche"
            >
              <Search size={24} />
            </button>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 rounded-md hover:bg-red-800 focus:outline-none transition-colors duration-300"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
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
  
            <div className="flex items-center space-x-4">
              {/* Barre de recherche desktop */}
              <div className="relative hidden lg:block" ref={searchRef}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Rechercher..."
                  className="bg-gray-500 text-white placeholder-gray-300 
                    px-4 py-2 rounded-md w-48
                    focus:outline-none focus:ring-2 focus:ring-white
                    transition-all duration-300
                    hover:bg-red-800 focus:bg-red-900"
                />
                <Search className="absolute right-3 top-2.5 text-orange-200 pointer-events-none" size={20} />
  
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-gray-700 rounded-md shadow-lg overflow-hidden">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer text-white hover:bg-red-800 transition-colors"
                        onClick={() => handleSearch(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
  
              {/* Info utilisateur */}
              {user && (
                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-700">
                  <User size={20} className="text-green-400" />
                  <span className="text-sm text-gray-200 hidden lg:block">
                    {user.email}
                  </span>
                </div>
              )}
  
              {/* Bouton paramètres */}
              <a
                href="/settings"
                className="group flex items-center space-x-2 px-3 py-2 rounded-md
                  hover:bg-red-800 transition-all duration-300
                  hover:shadow-lg hover:-translate-y-0.5"
              >
                <Settings size={20} className="transform transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-colors duration-300 hidden lg:inline">Paramètres</span>
              </a>
  
              {/* Bouton connexion/déconnexion */}
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
        </div>
      </div>
  
      {/* Barre de recherche mobile */}
      <div className={`
        absolute top-full left-0 right-0 bg-gray-700 
        transform transition-all duration-300 z-50
        ${isSearchOpen ? 'h-16 opacity-100' : 'h-0 opacity-0 pointer-events-none'}
      `}>
        <div className="container mx-auto px-4 py-3 flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Rechercher..."
            className="flex-1 bg-gray-600 text-white placeholder-gray-300 
              px-4 py-2 rounded-md
              focus:outline-none focus:ring-2 focus:ring-red-800
              transition-all duration-300"
          />
          <button
            onClick={toggleSearch}
            className="ml-3 p-2 hover:bg-red-800 rounded-md transition-colors duration-300"
          >
            <XIcon size={20} />
          </button>
  
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-4 right-4 top-full mt-1 bg-gray-700 rounded-md shadow-lg overflow-hidden z-50">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer text-white hover:bg-red-800 transition-colors"
                  onClick={() => {
                    handleSearch(suggestion);
                    setIsSearchOpen(false);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-600 shadow-lg z-40">
          <div className="px-2 pt-2 pb-3 space-y-1">
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
    </nav>
  );
};
export default Navigation;
