'use client';

import { motion } from 'framer-motion';
import Logo from './components/Logo';
import { ServerOffIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gray-900 relative overflow-hidden">
      {/* Logo en fond */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[600px] h-[600px] text-red-600">
          <Logo />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        <motion.h1
          className="text-6xl font-bold mb-8 text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          SABER
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-300 mb-12"
        >
          Sécurisez vos communications avec une technologie de pointe
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Cartes de fonctionnalités */}
          {[
            {
              title: "Cryptage Avancé",
              description: "Protection de niveau militaire pour vos données",
              icon: "🔐"
            },
            {
              title: "Multi-Format",
              description: "Support pour texte et PDF",
              icon: "📄"
            },
            {
              title: "Sécurité Maximale",
              description: "Vos données restent privées",
              icon: "🛡️"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}