// src/app/settings/page.js
'use client';

import React from 'react';
import { Settings, Bell, Shield, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContexts';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [twoFactor, setTwoFactor] = React.useState(false);

  const handleNotifications = () => {
    setNotifications(!notifications);
  };

  const handleTwoFactor = () => {
    setTwoFactor(!twoFactor);
  };

  const createToggleSwitch = (checked, onChange, id) => {
    return React.createElement('label', {
      className: 'relative inline-flex items-center cursor-pointer',
      key: `toggle-${id}`
    }, [
      React.createElement('input', {
        type: 'checkbox',
        className: 'sr-only peer',
        checked: checked,
        onChange: onChange,
        key: `input-${id}`
      }),
      React.createElement('div', {
        className: `
          w-11 h-6 bg-gray-200 
          peer-focus:outline-none peer-focus:ring-4 
          peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
          rounded-full peer dark:bg-gray-700 
          peer-checked:after:translate-x-full 
          peer-checked:after:border-white 
          after:content-[''] after:absolute 
          after:top-[2px] after:left-[2px] 
          after:bg-white after:border-gray-300 
          after:border after:rounded-full 
          after:h-5 after:w-5 after:transition-all 
          dark:border-gray-600 peer-checked:bg-blue-600
        `,
        key: `switch-${id}`
      })
    ]);
  };

  return React.createElement('div', {
    className: 'max-w-4xl mx-auto px-6 py-8 dark:bg-gray-900'
  }, [
    // Titre
    React.createElement('h1', {
      className: 'text-3xl font-bold mb-8 flex items-center gap-2 dark:text-white',
      key: 'title'
    }, [
      React.createElement(Settings, {
        className: 'text-blue-600',
        key: 'settings-icon'
      }),
      'Paramètres'
    ]),

    // Conteneur principal
    React.createElement('div', {
      className: 'bg-white rounded-lg shadow-md dark:bg-gray-800',
      key: 'main-container'
    }, [
      React.createElement('div', {
        className: 'p-6 border-b dark:border-gray-700',
        key: 'settings-section'
      }, [
        React.createElement('h2', {
          className: 'text-xl font-semibold mb-4 dark:text-white',
          key: 'section-title'
        }, 'Préférences générales'),

        // Liste des paramètres
        React.createElement('div', {
          className: 'space-y-4',
          key: 'settings-list'
        }, [
          // Mode sombre
          React.createElement('div', {
            className: 'flex items-center justify-between',
            key: 'dark-mode-container'
          }, [
            React.createElement('div', {
              className: 'flex items-center gap-2',
              key: 'dark-mode-label'
            }, [
              React.createElement(Moon, {
                size: 20,
                className: 'dark:text-white',
                key: 'moon-icon'
              }),
              React.createElement('span', {
                className: 'dark:text-white',
                key: 'dark-mode-text'
              }, 'Mode sombre')
            ]),
            createToggleSwitch(theme === 'dark', toggleTheme, 'theme')
          ]),

          // Notifications
          React.createElement('div', {
            className: 'flex items-center justify-between',
            key: 'notifications-container'
          }, [
            React.createElement('div', {
              className: 'flex items-center gap-2',
              key: 'notifications-label'
            }, [
              React.createElement(Bell, {
                size: 20,
                className: 'dark:text-white',
                key: 'bell-icon'
              }),
              React.createElement('span', {
                className: 'dark:text-white',
                key: 'notifications-text'
              }, 'Notifications')
            ]),
            createToggleSwitch(notifications, handleNotifications, 'notifications')
          ]),

          // Authentification à deux facteurs
          React.createElement('div', {
            className: 'flex items-center justify-between',
            key: 'two-factor-container'
          }, [
            React.createElement('div', {
              className: 'flex items-center gap-2',
              key: 'two-factor-label'
            }, [
              React.createElement(Shield, {
                size: 20,
                className: 'dark:text-white',
                key: 'shield-icon'
              }),
              React.createElement('span', {
                className: 'dark:text-white',
                key: 'two-factor-text'
              }, 'Double authentification')
            ]),
            createToggleSwitch(twoFactor, handleTwoFactor, 'two-factor')
          ])
        ])
      ])
    ])
  ]);
};

export default SettingsPage;