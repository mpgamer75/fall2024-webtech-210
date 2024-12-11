'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchCryptoNews } from '../API/cryptopanicService'; 

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const newsResults = await searchCryptoNews(query);
        setResults(newsResults);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-800"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Résultats pour : {query}</h1>
      
      <div className="grid gap-6">
        {results.map((article) => (
          <div 
            key={article.id} 
            className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-2">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-red-400 transition-colors"
              >
                {article.title}
              </a>
            </h2>
            {article.metadata && (
              <p className="text-gray-300 mb-4">{article.metadata}</p>
            )}
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Source: {article.source.title}</span>
              <span>{new Date(article.published_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      
      {results.length === 0 && (
        <div className="text-center text-gray-300">
          Aucun résultat trouvé pour cette recherche.
        </div>
      )}
    </div>
  );
}