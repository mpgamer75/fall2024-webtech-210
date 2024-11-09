// src/app/layout.js
import Navigation from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContext';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased transition-colors duration-300">
        <ThemeProvider>
          <div className="min-h-screen dark:bg-gray-900">
            <Navigation />
            <main className="transition-colors duration-300">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}