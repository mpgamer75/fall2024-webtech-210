export default function Privacy() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white
                                 bg-gradient-to-r from-red-800 to-white bg-clip-text text-transparent">
                        Politique de confidentialité de SABER
                    </h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="mb-8">
                            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Bienvenue sur notre page de confidentialité
                            </p>
                        </div>

                        <section className="mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-400">
                                Préambule
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                SABER est une application dont le but est de permettre un moyen sûr de crypter et décrypter des documents.
                            </p>
                        </section>

                        <section className="mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-400">
                                Collecte et utilisation des données
                            </h2>
                            <ul className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                                <li>SABER ne collecte aucune donnée de la part de ses utilisateurs, sauf en cas d'accord explicite</li>
                                <li>Les données récoltées ne sont utilisées que dans un but d'amélioration de l'application</li>
                                <li>Ces données ne sont accessibles qu'aux développeurs de l'application</li>
                                <li>Les autres utilisateurs de l'application ne peuven pas avoir accès à vos documents</li>
                            </ul>
                        </section>

                        <section className="mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-400">
                                Gestion des documents
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 font-semibold">
                                SABER ne partage pas les documents fournis par ses utilisateurs à d'autres organismes ou entreprises.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}