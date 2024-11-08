// src/app/blog/page.js
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <BookOpen className="text-blue-600" />
        Blog
      </h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              L'importance du cryptage dans le monde numérique
            </h2>
            <p className="text-gray-600 mb-4">
              Découvrez pourquoi le cryptage est essentiel pour protéger vos données personnelles...
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">10 Nov 2024</span>
              <button className="text-blue-600 hover:underline">Lire plus</button>
            </div>
          </div>
        </article>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              Comment choisir une bonne clé de cryptage
            </h2>
            <p className="text-gray-600 mb-4">
              Les meilleures pratiques pour créer et gérer vos clés de cryptage...
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">8 Nov 2024</span>
              <button className="text-blue-600 hover:underline">Lire plus</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}