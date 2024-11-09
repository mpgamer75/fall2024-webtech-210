'use client';

import { Search, Settings, Home, Lock, Unlock, BookOpen } from 'lucide-react';

const Navigation = () => {
  const links = [
    { href: '/', icon: Home, text: 'Accueil' },
    { href: '/encrypt', icon: Lock, text: 'Crypter' },
    { href: '/decrypt', icon: Unlock, text: 'Décrypter' },
    { href: '/blog', icon: BookOpen, text: 'Blog' }
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {links.map(({ href, icon: Icon, text }) => (
              <a
                key={href}
                href={href}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Icon size={20} />
                <span>{text}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-blue-500 text-white placeholder-blue-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white w-48"
              />
              <Search className="absolute right-3 top-2.5" size={20} />
            </div>
            <a
              href="/settings"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Settings size={20} />
              <span>Paramètres</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;