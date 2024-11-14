import {Lock, Clock, Mail, Phone, MessageSquare, FileText, Shield, AlertCircle} from 'lucide-react';

export default function Services() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-800 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-red-800 to-white bg-clip-text text-transparent">
                        Services sur SABER
                    </h1>

                    {/* Section Support */}
                    <section className="mb-12 bg-gray-700 dark:bg-gray-800 p-6 rounded-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-semibold mb-6 text-red-400 flex items-center">
                            <Shield className="mr-2" size={24} />
                            Support Technique
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4 text-gray-300 p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300">
                                <h3 className="text-xl font-semibold flex items-center">
                                    <Phone className="mr-2 text-red-400" size={20} />
                                    Assistance 24/7
                                </h3>
                                <p className="leading-relaxed">Notre équipe est disponible en permanence pour répondre à vos questions et résoudre vos problèmes.</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <Mail size={16} /> Support par email
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <MessageSquare size={16} /> Chat en direct
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FileText size={16} /> Documentation détaillée
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Phone size={16} /> Assistance téléphonique
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4 text-gray-300 p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300">
                                <h3 className="text-xl font-semibold flex items-center">
                                    <Clock className="mr-2 text-red-400" size={20} />
                                    Temps de réponse
                                </h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <Clock size={16} /> Réponse initiale : 2 heures
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Clock size={16} /> Résolution moyenne : 24 heures
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <AlertCircle size={16} /> Cas critiques : support prioritaire
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="mb-12 bg-gray-700 dark:bg-gray-800 p-6 rounded-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-semibold mb-6 text-red-400 flex items-center">
                            <MessageSquare className="mr-2" size={24} />
                            Questions Fréquentes
                        </h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300">
                                <h3 className="font-semibold text-white mb-3 text-lg flex items-center">
                                    <Lock className="mr-2 text-red-400" size={20} />
                                    Comment réinitialiser mon mot de passe ?
                                </h3>
                                <p className="text-gray-300 pl-7">
                                    Utilisez la fonction "Mot de passe oublié" sur la page de connexion. 
                                    Un email vous sera envoyé avec les instructions.
                                </p>
                            </div>

                            <div className="p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300">
                                <h3 className="font-semibold text-white mb-3 text-lg flex items-center">
                                    <AlertCircle className="mr-2 text-red-400" size={20} />
                                    Que faire en cas de fichier corrompu ?
                                </h3>
                                <p className="text-gray-300 pl-7 font-medium">ALT + F4</p>
                            </div>

                            <div className="p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300">
                                <h3 className="font-semibold text-white mb-3 text-lg flex items-center">
                                    <Phone className="mr-2 text-red-400" size={20} />
                                    Comment contacter le support urgent ?
                                </h3>
                                <p className="text-gray-300 pl-7">
                                    En cas d'urgence, contactez le +33 7 67 80 40 34.
                                </p>
                            </div>

                            <div className="p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300">
                                <h3 className="font-semibold text-white mb-3 text-lg flex items-center">
                                    <Shield className="mr-2 text-red-400" size={20} />
                                    Qui a accès à mes documents ?
                                </h3>
                                <div className="space-y-3 text-gray-300 pl-7">
                                    <p>Seuls les développeurs autorisés ont un accès restreint à la base de données, et ce uniquement pour :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>La maintenance technique</li>
                                        <li>La résolution des problèmes critiques</li>
                                    </ul>
                                    <p className="mt-4 font-medium border-l-4 border-red-800 pl-3">
                                        L'exploitation de vos données sans votre accord est strictement interdite.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Plans de support */}
                    <section className="mb-12 bg-gray-700 dark:bg-gray-800 p-6 rounded-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-semibold mb-6 text-red-400 flex items-center">
                            <Shield className="mr-2" size={24} />
                            Niveaux de Support
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-gray-600 rounded-lg text-center hover:-translate-y-2 transition-transform duration-300">
                                <h3 className="text-xl font-bold text-white mb-4">Basique</h3>
                                <ul className="text-gray-300 space-y-3">
                                    <li className="flex items-center justify-center gap-2">
                                        <Mail size={16} /> Support par email
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <Clock size={16} /> Temps de réponse 24h
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <FileText size={16} /> Documentation en ligne
                                    </li>
                                    <li className="font-bold text-lg mt-4">Gratuit: $0</li>
                                </ul>
                            </div>

                            <div className="p-6 bg-gray-600 rounded-lg text-center border-2 border-red-800 hover:-translate-y-2 transition-transform duration-300
                                          shadow-lg shadow-red-800/20">
                                <h3 className="text-xl font-bold text-white mb-4">Premium</h3>
                                <ul className="text-gray-300 space-y-3">
                                    <li className="flex items-center justify-center gap-2">
                                        <Shield size={16} /> Support prioritaire
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <Clock size={16} /> Temps de réponse 4h
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <MessageSquare size={16} /> Chat en direct
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <Phone size={16} /> Support téléphonique
                                    </li>
                                    <li className="font-bold text-lg mt-4">Abonnement par mois: $5</li>
                                </ul>
                            </div>

                            <div className="p-6 bg-gray-600 rounded-lg text-center border-2 border-yellow-500 hover:-translate-y-2 transition-transform duration-300
                                          shadow-lg shadow-yellow-500/20">
                                <h3 className="text-xl font-bold text-white mb-4">Entreprise</h3>
                                <ul className="text-gray-300 space-y-3">
                                    <li className="flex items-center justify-center gap-2">
                                        <Shield size={16} /> Support dédié 24/7
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <Clock size={16} /> Temps de réponse 1h
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <MessageSquare size={16} /> Gestionnaire de compte
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <FileText size={16} /> Formation personnalisée
                                    </li>
                                    <li className="font-bold text-lg mt-4">Abonnement par mois: $8</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}