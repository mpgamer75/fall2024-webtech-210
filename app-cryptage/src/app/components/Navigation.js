'use client';

import { Search, Settings, Home, Lock, Unlock, BookOpen, Menu } from 'lucide-react';
import Logo from './Logo';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: '/', icon: Home, text: 'Accueil' },
    { href: '/encrypt', icon: Lock, text: 'Crypter' },
    { href: '/decrypt', icon: Unlock, text: 'Décrypter' },
    { href: '/blog', icon: BookOpen, text: 'Blog' }
  ];

  return (
    <nav className="bg-gray-600 text-white shadow-lg">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et Marque */}
          <div className="flex items-center">
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
                         drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)]">
                SABER
              </span>
            </div>
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

            {/* Barre de recherche et settings */}
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

              <a
                href="/settings"
                className="group flex items-center space-x-2 px-3 py-2 rounded-md
                         hover:bg-red-800 transition-all duration-300
                         hover:shadow-lg hover:-translate-y-0.5"
              >
                <Settings size={20} className="transform transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-colors duration-300 hidden lg:inline">Paramètres</span>
              </a>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map(({ href, icon: Icon, text }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-800"
                >
                  <Icon size={20} />
                  <span>{text}</span>
                </a>
              ))}
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full bg-gray-500 text-white placeholder-gray-300 px-4 py-2 rounded-md"
                />
                <Search className="absolute right-3 top-2.5 text-orange-200 pointer-events-none" size={20} />
              </div>
              <a
                href="/settings"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-800 mt-3"
              >
                <Settings size={20} />
                <span>Paramètres</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;