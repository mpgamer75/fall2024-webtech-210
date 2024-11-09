// src/app/settings/page.js
'use client';

import { Settings, Bell, Shield, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

const ToggleSwitch = ({ checked, onChange, label }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                    peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full 
                    peer dark:bg-gray-700 peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute 
                    after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                    after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                    dark:border-gray-600 peer-checked:bg-blue-600" />
    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </span>
  </label>
);

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 dark:text-white">
        <Settings className="text-blue-600" />
        Paramètres
      </h1>

      <div className="bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Préférences générales
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="dark:text-white" size={20} />
                <span className="dark:text-white">Mode sombre</span>
              </div>
              <ToggleSwitch
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="dark:text-white" size={20} />
                <span className="dark:text-white">Notifications</span>
              </div>
              <ToggleSwitch
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="dark:text-white" size={20} />
                <span className="dark:text-white">Double authentification</span>
              </div>
              <ToggleSwitch
                checked={twoFactor}
                onChange={() => setTwoFactor(!twoFactor)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}