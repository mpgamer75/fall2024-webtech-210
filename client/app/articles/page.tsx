// app/articles/page.tsx
import Link from 'next/link';
import Layout from '../layout'; // Assurez-vous que le chemin d'importation est correct

const articles = [
  { id: '1', title: 'Introduction à React', description: 'Apprenez les bases de React.' },
  { id: '2', title: 'Comprendre Next.js', description: 'Découvrez comment Next.js simplifie le développement web.' },
  { id: '3', title: 'JavaScript moderne', description: 'Tout sur les nouvelles fonctionnalités de JavaScript.' },
];

export default function Articles() {
  return (
    <Layout>
      <h1>Nos articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>
            
                <h2><strong>{article.title}</strong></h2>
                <p>{article.description}</p>
             
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
