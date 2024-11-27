// src/app/layout.js
import Navigation from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContext';
import './globals.css';
import { AuthProvider } from './contexts/AuthContext';
import Script from 'next/script';

export const metadata = {
  title: 'SABER',
  description: 'Application de cryptage sécurisée',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-app3.png" type="image/png" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
          strategy="beforeInteractive"
        />
        <Script id="pdf-worker" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined') {
              window.pdfjsLib = window.pdfjsLib || {};
              window.pdfjsLib.GlobalWorkerOptions = window.pdfjsLib.GlobalWorkerOptions || {};
              window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            }
          `}
        </Script>
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
1f3bc2957de61b5775d178cdec4d0b49e6dd4462
      </body>
    </html>
  );
}
