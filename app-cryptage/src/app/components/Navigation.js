// src/app/components/Navigation.js
'use client';

import React from 'react';
import { Search, Settings, Home, Lock, Unlock, BookOpen } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContexts';

const Navigation = () => {
  const { theme } = useTheme();
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  const handleNavigation = (path) => {
    setCurrentPath(path);
    window.location.href = path;
  };

  // Classes de base pour les boutons de navigation
  const buttonBaseClass = 'flex items-center space-x-2 px-3 py-2 rounded-md transition-colors';
  const buttonClass = `${buttonBaseClass} ${theme === 'dark' 
    ? 'text-white hover:bg-gray-700' 
    : 'text-white hover:bg-blue-700'}`;

  return React.createElement('nav', {
    className: `${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-600'} p-4 shadow-lg transition-colors`
  }, 
    React.createElement('div', {
      className: 'max-w-7xl mx-auto'
    }, 
      React.createElement('div', {
        className: 'flex items-center justify-between'
      }, [
        // Navigation buttons
        React.createElement('div', {
          className: 'flex items-center space-x-8',
          key: 'nav-buttons'
        }, [
          // Home
          React.createElement('button', {
            onClick: () => handleNavigation('/'),
            className: buttonClass,
            key: 'home'
          }, [
            React.createElement(Home, { size: 20, key: 'home-icon' }),
            React.createElement('span', { key: 'home-text' }, 'Accueil')
          ]),

          // Encrypt
          React.createElement('button', {
            onClick: () => handleNavigation('/encrypt'),
            className: buttonClass,
            key: 'encrypt'
          }, [
            React.createElement(Lock, { size: 20, key: 'encrypt-icon' }),
            React.createElement('span', { key: 'encrypt-text' }, 'Crypter')
          ]),

          // Decrypt
          React.createElement('button', {
            onClick: () => handleNavigation('/decrypt'),
            className: buttonClass,
            key: 'decrypt'
          }, [
            React.createElement(Unlock, { size: 20, key: 'decrypt-icon' }),
            React.createElement('span', { key: 'decrypt-text' }, 'Décrypter')
          ]),

          // Blog
          React.createElement('button', {
            onClick: () => handleNavigation('/blog'),
            className: buttonClass,
            key: 'blog'
          }, [
            React.createElement(BookOpen, { size: 20, key: 'blog-icon' }),
            React.createElement('span', { key: 'blog-text' }, 'Blog')
          ])
        ]),

        // Right section (Search and Settings)
        React.createElement('div', {
          className: 'flex items-center space-x-4',
          key: 'right-section'
        }, [
          // Search input
          React.createElement('div', {
            className: 'relative',
            key: 'search'
          }, [
            React.createElement('input', {
              type: 'text',
              placeholder: 'Rechercher...',
              className: `${theme === 'dark' 
                ? 'bg-gray-700 text-white placeholder-gray-400' 
                : 'bg-blue-500 text-white placeholder-blue-200'} 
                px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white w-48`,
              key: 'search-input'
            }),
            React.createElement(Search, {
              className: 'absolute right-3 top-2.5',
              size: 20,
              key: 'search-icon'
            })
          ]),

          // Settings
          React.createElement('button', {
            onClick: () => handleNavigation('/settings'),
            className: buttonClass,
            key: 'settings'
          }, [
            React.createElement(Settings, { size: 20, key: 'settings-icon' }),
            React.createElement('span', { key: 'settings-text' }, 'Paramètres')
          ])
        ])
      ])
    )
  );
};

export default Navigation;