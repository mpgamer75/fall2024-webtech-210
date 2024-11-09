// src/app/page.js
export default function Home() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
        Bienvenue sur App Cryptage
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-200">
        Une application simple et sécurisée pour crypter et décrypter vos messages.
      </p>

      {/* Si vous avez des cartes ou d'autres éléments */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
            Cryptage Sécurisé
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cryptez vos messages de manière sécurisée avec une clé personnalisée.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
            Décryptage Simple
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Décryptez facilement vos messages avec votre clé de décryptage.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
            100% Privé
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Vos données restent privées et ne sont jamais stockées sur nos serveurs.
          </p>
        </div>
      </div>
    </div>
  );
}