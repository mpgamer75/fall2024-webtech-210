'use client';

import Logo from './components/Logo';

import { 
  Mail, 
  Phone, 
  MapPin, 
  Search, 
  Settings, 
  Home as HomeIcon, 
  Lock, 
  Unlock, 
  BookOpen 
} from 'lucide-react';

import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaGithub 
} from 'react-icons/fa';

import {RiTwitterXFill} from 'react-icons/ri'; // import d'une bibliothèque/ package différent du react-icons/fa6 pour importer le vrai logo de Twitter ( X )  


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-4 overflow-hidden">
          <div className="max-w-[1920px] mx-auto text-center">
            {/* Logo et titre centrés */}
            <div className="mb-8 sm:mb-12 animate-fade-in flex flex-col items-center">
              <div className="mb-4">
                <Logo size="large" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold 
                         bg-gradient-to-r from-red-800 to-white 
                         bg-clip-text text-transparent transform transition-all duration-300 
                         hover:tracking-wider hover:scale-105 cursor-pointer
                         drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)]
                         animate-scale-in delay-200">
                SABER
              </h1>
            </div>

            <div className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 
                       mb-8 sm:mb-12 animate-fade-in delay-300
                       max-w-2xl mx-auto
                       transform transition-all duration-300 hover:scale-105 
                       hover:text-red-800 dark:hover:text-red-400 cursor-default
                       hover:drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)]">
                 Avec nous, vos documents ne risquent rien.
            </div>

            {/* Cards section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 lg:mt-16
                       max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {[
                {
                  title: "Cryptage Avancé",
                  description: "Protection de niveau militaire pour vos données",
                  icon: "🔐",
                  delay: "delay-200"
                },
                {
                  title: "Multi-Format",
                  description: "Support pour texte et PDF",
                  icon: "📄",
                  delay: "delay-300"
                },
                {
                  title: "Sécurité Maximale",
                  description: "Vos données restent privées",
                  icon: "🛡️",
                  delay: "delay-400"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg 
                           transform transition-all duration-300
                           hover:shadow-xl hover:-translate-y-1
                           animate-fade-in ${feature.delay}
                           group cursor-default`}
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 lg:mb-6 
                               transform transition-all duration-300 
                               group-hover:scale-125">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 dark:text-white
                             transform transition-all duration-300
                             group-hover:text-red-800 dark:group-hover:text-red-400">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300
                             transform transition-all duration-300
                             group-hover:text-red-700 dark:group-hover:text-red-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistiques Section */}
        <div className="bg-gray-100 dark:bg-gray-800 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: "10M+", label: "Utilisateurs" },
                { number: "99.9%", label: "Disponibilité" },
                { number: "24/7", label: "Support" },
                { number: "150+", label: "Pays" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-800 dark:text-red-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section CTA */}
        <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Prêt à sécuriser vos communications ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Commencez dès maintenant à protéger vos données avec SABER.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/encrypt"
                className="bg-red-800 text-white px-8 py-3 rounded-md hover:bg-red-700 
                         transition-all duration-300 transform hover:scale-105"
              >
                Commencer
              </a>
              <a
                href="/contact"
                className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white 
                         px-8 py-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600
                         transition-all duration-300 transform hover:scale-105"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="max-w-[1920px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* À propos */}
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/logo-app3.png" 
                  alt="Logo" 
                  className="h-8 w-auto mr-2"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-red-800 to-white 
                              bg-clip-text text-transparent">
                  SABER
                </span>
              </div>
              <p className="text-sm">
                SABER est une solution innovante de cryptage pour sécuriser vos communications 
                et protéger vos données sensibles avec une technologie de pointe.
              </p>
            </div>

            {/* Liens rapides */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Liens Rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:text-white transition-colors duration-300">À propos</a>
                </li>
                <li>
                  <a href="/services" className="hover:text-white transition-colors duration-300">Services</a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white transition-colors duration-300">Blog</a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition-colors duration-300">FAQ</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  <a href="mailto:charleslantiguajorge@gmail.com" 
                     className="hover:text-white transition-colors duration-300">
                    charleslantiguajorge@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  <a href="tel:+33123456789"
                     className="hover:text-white transition-colors duration-300">
                    +33 7 67 80 40 34
                  </a>
                </li>
                <li className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  <span>Paris, France</span>
                </li>
              </ul>
            </div>
            
            
            {/* Réseaux sociaux avec connexion sécuriser */} 
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className="hover:text-white transition-colors duration-300">
                  <FaFacebookF size={24} />
                </a>
                <a href="https://twitter.com" target='_blank' rel='noopener noreferrer'   className="hover:text-white transition-colors duration-300">
                  <RiTwitterXFill size={24} />
                </a>
                <a href="https://www.instagram.com/charles.ltgj" target='_blank' rel='noopener noreferrer' className="hover:text-white transition-colors duration-300">
                  <FaInstagram size={24} />
                </a>
                <a href="https://www.linkedin.com/in/charles-lantigua-jorge-2b63132a4" target='_blank' rel='noopener noreferrer' className="hover:text-white transition-colors duration-300">
                  <FaLinkedinIn size={24} />
                </a>
                <a href="https://github.com/mpgamer75" target='_blank' rel='noopener noreferrer' className="hover:text-white transition-colors duration-300">
                  <FaGithub size={24} />
                </a>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2 text-white">Newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-800 w-full"
                  />
                  <button className="bg-red-800 text-white px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors duration-300">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Barre de copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div>
                © {new Date().getFullYear()} SABER. Tous droits réservés.
              </div>
              <div className="flex space-x-4"> 
              {/*dans cette partie on développe les liens pour accéder à ces pages que l'on développe => page à créer dans app/page_à_créer / pour que que lorsque l'on clique sur le lien on nous redirige vers la page dédié */}
                <a href="./privacy" className="hover:text-white transition-colors duration-300">
                  Politique de confidentialité
                </a>
                <a href="./terms" className="hover:text-white transition-colors duration-300">
                  Conditions d'utilisation
                </a>
                <a href="./legal" className="hover:text-white transition-colors duration-300">
                  Mentions légales
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// zone des liens ( et le footer ) à revoir et à compléter 
