// src/app/page.js
import Logo from './components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo et titre centrés */}
        <div className="mb-12 animate-fade-in flex flex-col items-center">
          <div className="mb-4">
            <Logo size="large" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white animate-scale-in delay-200">
            SABER
          </h1>
        </div>

        <div className="text-xl text-gray-600 dark:text-gray-300 mb-12 animate-fade-in delay-300">
          Sécurisez vos communications avec une technologie de pointe
        </div>

        {/* Cards section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg 
                         transform transition-all duration-300
                         hover:shadow-xl hover:-translate-y-1
                         animate-fade-in ${feature.delay}`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}