'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
 theme: 'dark',
 toggleTheme: () => {}
}); 

export const ThemeProvider = ({ children }) => {
 const [mounted, setMounted] = useState(false);
 const [theme, setTheme] = useState(() => {
   if (typeof window !== 'undefined') {
     return localStorage.getItem('theme') || 'dark';
   }
   return 'dark';
 });

 useEffect(() => {
   setMounted(true);
   const savedTheme = localStorage.getItem('theme') || 'dark';
   setTheme(savedTheme);
   document.documentElement.className = savedTheme;
 }, []);

 const toggleTheme = () => {
   const newTheme = theme === 'dark' ? 'light' : 'dark';
   setTheme(newTheme);
   localStorage.setItem('theme', newTheme);
   document.documentElement.className = newTheme;
 };

 if (!mounted) {
   return null;
 }

 return (
   <ThemeContext.Provider value={{ theme, toggleTheme }}>
     {children}
   </ThemeContext.Provider>
 );
};

export const useTheme = () => useContext(ThemeContext);