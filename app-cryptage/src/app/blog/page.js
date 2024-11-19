export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Blog
      </h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              L'importance du cryptage
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Découvrez pourquoi le cryptage est essentiel...
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                10 Nov 2024
              </span>
              <button className="text-blue-600 dark:text-blue-400 hover:underline">
                Lire plus
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}