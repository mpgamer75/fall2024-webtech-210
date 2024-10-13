const express = require("express");
const app = express();

app.use(express.json());

const articlesRouter = require('./routes/articles');
const commentsRouter = require('./routes/comments');




app.get('/articles',(req,res)=>{ // fonction qui permet de récuperer ( grâce à la méthode GET d'express ) les articles de la base de données 
  res.json(db.articles); // la réponse est donné sous forme de JSON 
});


app.post('/articles', (req, res) => {  // permet d'ajouter un nouvel article grâce à la méthode POST --> extrait les données title, content et author / génère un nouvel id via uuidv4 
  const { title, content, author } = req.body;
  const newArticle = {
    id: uuidv4(),
    title,
    content,
    date: new Date().toLocaleDateString(),
    author
  };
  db.articles.push(newArticle);
  res.status(201).json(newArticle); // statut HTTP qui dit qu'une ressource a été créé avec succès 
});

app.get('/articles/:articleId', (req, res) => { // récupère les articles des clients via l'ID 
  const article = db.articles.find(article => article.id === req.params.articleId);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' }); // res.status ==> renvoie un statut HTTP ==> ici 404 veut dire non trouvé 
  }
});

app.get('/articles/:articleId/comments', (req, res) => { // syntaxe ==> /articles ==> récupère grâce au GET les articles ==> /articles/:articleID ==> récupère les articles via leur ID 
  const articleComments = db.comments.filter(comment => comment.articleId === req.params.articleId);
  res.json(articleComments);
});

app.post('/articles/:articleId/comments', (req, res) => { // Ici on ajoute grâce à POST des articles 
  const { content, author } = req.body;
  const newComment = {
    id: uuidv4(), // ID uuidv4 permet de catégoriser de manière unique grâce à des identifiants des articles 
    timestamp: Date.now(),
    content,
    articleId: req.params.articleId,
    author
  };
  db.comments.push(newComment);
  res.status(201).json(newComment);
});

app.get('/articles/:articleId/comments/:commentId', (req, res) => {
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
app.listen(PORT, () => { // on "écoute" le port 3000 
  console.log(`Server is running on port ${PORT}`);

app.use('/articles', articlesRouter);
app.use('/articles', commentsRouter);  // Les commentaires sont basés sur les articles

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
>>>>>>> 301ede5bb8eee3598e3122548c4655b331912dea
});
