// app/articles/[articleId]/page.tsx
import { useRouter } from 'next/router';
import Layout from '../../layout'; // Assurez-vous que le chemin d'importation est correct

const articles = [
  { id: '1', title: 'Introduction à React', description: 'Apprenez les bases de React.' },
  { id: '2', title: 'Comprendre Next.js', description: 'Découvrez comment Next.js simplifie le développement web.' },
  { id: '3', title: 'JavaScript moderne', description: 'Tout sur les nouvelles fonctionnalités de JavaScript.' },
];

export default function ArticlePage() {
  const router = useRouter();
  const { articleId } = router.query;

  const article = articles.find((article) => article.id === articleId);

  if (!article) {
    return <p>Article non trouvé</p>;
  }

  return (
    <Layout>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </Layout>
  );
}
