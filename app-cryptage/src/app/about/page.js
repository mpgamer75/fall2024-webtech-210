export default function About(){
    return(
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-800 drak:bg-gray-900">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-dark
                                 bg-gradient-to-r from-red-800 to-white bg-clip-text text-transparent">
                                    A propos de SABER
                                 </h1>

                                 <div className="space-y-8">
                        <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-400">
                                La mission de SABER
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                SABER a pour mission de fournir une solution de cryptage sécurisée et facile 
                                d'utilisation pour protéger vos documents sensibles. Notre priorité est la 
                                sécurité de vos données.
                            </p>
                        </section>

                        <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-400">
                                L'équipe
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                Notre équipe est composée d'étudiants passionnés par la cybersécurité et 
                                déterminés à offrir la meilleure protection possible pour vos données.
                            </p>
                        </section>

                        <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-400">
                                Notre Technologie
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                SABER utilise des algorithmes de cryptage avancé de niveau militaire pour 
                                assurer la sécurité maximale de vos documents. Notre technologie est 
                                constamment mise à jour pour répondre aux dernières normes de sécurité.
                            </p>
                        </section>

                        <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-400">
                                Nos Valeurs
                            </h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Sécurité avant tout</li>
                                <li>Confidentialité des données</li>
                                <li>Innovation continue</li>
                                <li>Satisfaction client</li>
                                <li>Transparence</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}