// src/app/layout.js
import Navigation from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContext';
import './globals.css';
import { AuthProvider } from './contexts/AuthContext';

export const metadata = {
  title: 'SABER',
  description: 'Application de cryptage sécurisée',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-app3.png" type="image/png" />
      </head>
      <body className="antialiased transition-colors duration-300">
        <AuthProvider>
          <ThemeProvider>
            <div className="min-h-screen dark:bg-gray-900">
              <Navigation />
              <main className="transition-colors duration-300">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}