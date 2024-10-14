import Layout from '../components/Layout';
import Link from 'next/link';

const articles = [
  { id: '1', title: 'Introduction à React', description: 'Apprenez les bases de React.' },
  { id: '2', title: 'Comprendre Next.js', description: 'Découvrez comment Next.js simplifie le développement web.' },
  { id: '3', title: 'JavaScript moderne', description: 'Tout sur les nouvelles fonctionnalités de JavaScript.' },
];

export default function Articles() {
  return (
    <Layout>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>
              <a>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
