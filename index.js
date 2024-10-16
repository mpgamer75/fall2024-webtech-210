const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid'); // Importation de uuidv4 pour générer des identifiants uniques

app.use(express.json());

const articlesRouter = require('./routes/articles');
const commentsRouter = require('./routes/comments');

// Simulation d'une base de données
const db = {
  articles: [],
  comments: []
};

app.get('/articles', (req, res) => { 
  // Fonction qui permet de récupérer les articles de la base de données grâce à la méthode GET
  res.json(db.articles); // La réponse est donnée sous forme de JSON
});

app.post('/articles', (req, res) => {
  // Permet d'ajouter un nouvel article avec la méthode POST
  const { title, content, author } = req.body;
  const newArticle = {
    id: uuidv4(), // Génère un nouvel id via uuidv4
    title,
    content,
    date: new Date().toLocaleDateString(),
    author
  };
  db.articles.push(newArticle);
  res.status(201).json(newArticle); // Statut HTTP qui indique que la ressource a été créée avec succès
});

app.get('/articles/:articleId', (req, res) => {
  // Récupère un article via son ID
  const article = db.articles.find(article => article.id === req.params.articleId);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' }); // Renvoie un statut HTTP 404 si l'article n'est pas trouvé
  }
});

app.get('/articles/:articleId/comments', (req, res) => {
  // Récupère les commentaires d'un article via son ID
  const articleComments = db.comments.filter(comment => comment.articleId === req.params.articleId);
  res.json(articleComments);
});

app.post('/articles/:articleId/comments', (req, res) => {
  // Ajoute un commentaire à un article via POST
  const { content, author } = req.body;
  const newComment = {
    id: uuidv4(), // Génère un identifiant unique pour le commentaire
    timestamp: Date.now(),
    content,
    articleId: req.params.articleId,
    author
  };
  db.comments.push(newComment);
  res.status(201).json(newComment); // Renvoie le nouveau commentaire avec un statut 201
});

app.get('/articles/:articleId/comments/:commentId', (req, res) => {
  // Récupère un commentaire spécifique via l'ID de l'article et l'ID du commentaire
  const comment = db.comments.find(
    comment => comment.id === req.params.commentId && comment.articleId === req.params.articleId
  );
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
