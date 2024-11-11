import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-800 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-red-800 to-white bg-clip-text text-transparent
                                 hover:scale-105 transition-transform duration-300">
                        Liste de liens pour nous contacter
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Coordonnées */}
                        <div className="bg-gray-700 dark:bg-gray-800 rounded-lg p-8 hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-semibold mb-8 text-red-400 flex items-center">
                                <Mail className="mr-2" size={24} />
                                Contact
                            </h3>
                            
                            <ul className="space-y-6">
                                <li className="flex items-center p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300">
                                    <Mail size={24} className="mr-4 text-red-400" />
                                    <a href="mailto:charleslantiguajorge@gmail.com" 
                                       className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">
                                        charleslantiguajorge@gmail.com
                                    </a>
                                </li>
                                
                                <li className="flex items-center p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300">
                                    <Phone size={24} className="mr-4 text-red-400" />
                                    <a href="tel:+33767804034"
                                       className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">
                                        +33 7 67 80 40 34
                                    </a>
                                </li>
                                
                                <li className="flex items-center p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300">
                                    <MapPin size={24} className="mr-4 text-red-400" />
                                    <span className="text-gray-300 text-lg">
                                        10 Rue Sextius Michel, 75015 Paris
                                    </span>
                                </li>

                                {/* Réseaux sociaux */}
                                <li className="p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300">
                                    <h4 className="text-lg font-semibold text-red-400 mb-4">Réseaux sociaux</h4>
                                    <div className="flex space-x-4 justify-center">
                                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" 
                                           className="hover:text-white transition-colors duration-300 text-gray-300">
                                            <FaFacebookF size={24} />
                                        </a>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                                           className="hover:text-white transition-colors duration-300 text-gray-300">
                                            <RiTwitterXFill size={24} />
                                        </a>
                                        <a href="https://www.instagram.com/charles.ltgj" target="_blank" rel="noopener noreferrer" 
                                           className="hover:text-white transition-colors duration-300 text-gray-300">
                                            <FaInstagram size={24} />
                                        </a>
                                        <a href="https://www.linkedin.com/in/charles-lantigua-jorge-2b63132a4" target="_blank" rel="noopener noreferrer" 
                                           className="hover:text-white transition-colors duration-300 text-gray-300">
                                            <FaLinkedinIn size={24} />
                                        </a>
                                        <a href="https://github.com/mpgamer75" target="_blank" rel="noopener noreferrer" 
                                           className="hover:text-white transition-colors duration-300 text-gray-300">
                                            <FaGithub size={24} />
                                        </a>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-8 p-4 bg-gray-600 rounded-lg border-l-4 border-red-800">
                                <p className="text-gray-300">
                                    Notre équipe est disponible du lundi au vendredi, de 9h à 18h.
                                    Pour toute urgence en dehors de ces horaires, veuillez utiliser notre chat en ligne.
                                </p>
                            </div>
                        </div>

                        {/* Carte Google Maps */}
                        <div className="bg-gray-700 dark:bg-gray-800 rounded-lg p-8 hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-semibold mb-8 text-red-400 flex items-center">
                                <MapPin className="mr-2" size={24} />
                                Nos Locaux
                            </h3>
                            
                            {/*Map Google pour voir les locaux => pour l'instant c'est l'école*/}
                            <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.472391555303!2d2.2859716760461746!3d48.851224171331286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6701b4f58251b%3A0x167f5a60fb94aa76!2sECE%20Paris%20Lyon!5e0!3m2!1sfr!2sfr!4v1699718137244!5m2!1sfr!2sfr"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}