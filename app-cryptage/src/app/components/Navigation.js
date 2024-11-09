// src/components/Navigation.js
'use client';

import { Search, Settings, Home, Lock, Unlock, BookOpen } from 'lucide-react';
import Logo from './Logo';

const Navigation = () => {
  const links = [
    { href: '/', icon: Home, text: 'Accueil' },
    { href: '/encrypt', icon: Lock, text: 'Crypter' },
    { href: '/decrypt', icon: Unlock, text: 'Décrypter' },
    { href: '/blog', icon: BookOpen, text: 'Blog' }
  ];

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="mr-6 py-2">
              <Logo size="small" />
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              {links.map(({ href, icon: Icon, text }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center space-x-2 px-3 py-2 rounded-md
                           hover:bg-red-700 transition-all duration-300
                           hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Icon 
                    size={20} 
                    className="transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="transition-colors duration-300">
                    {text}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Search and Settings */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-blue-500 text-white placeholder-orange-200 
                         px-4 py-2 rounded-md w-48
                         focus:outline-none focus:ring-2 focus:ring-white
                         transition-all duration-300
                         hover:bg-red-900 focus:bg-orange-400"
              />
              <Search 
                className="absolute right-3 top-2.5 
                          text-orange-200 pointer-events-none" 
                size={20}
              />
            </div>

            {/* Settings Link */}
            <a
              href="/settings"
              className="group flex items-center space-x-2 px-3 py-2 rounded-md
                       hover:bg-orange-500 transition-all duration-300
                       hover:shadow-lg hover:-translate-y-0.5"
            >
              <Settings 
                size={20}
                className="transform transition-transform duration-300 group-hover:scale-110" 
              />
              <span className="transition-colors duration-300">
                Paramètres
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
