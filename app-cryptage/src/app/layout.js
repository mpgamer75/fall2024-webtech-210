// src/app/layout.js
'use client';

import Navigation from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContexts';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="light">
      <body className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
        <ThemeProvider>
          <Navigation />
          <main className="dark:bg-gray-900">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}