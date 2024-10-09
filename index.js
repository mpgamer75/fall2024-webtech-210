const express = require("express"); // appel le framework express

const {v4: uuidv4}=require('uuid'); // pour générer des uuid --> identifiant unique pour chaque composant du site 
const app = express(); // variable app utilise le framework express --> nous permet de l'appeler et de l'utiliser par la suite 

app.use(express.json()); // permet à notre application d'intérpreter les paquets JSON


const db = {
  articles: [
    {
      id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      title: 'My article',
      content: 'Content of the article.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    }
  ],
  comments: [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      timestamp: 1664835049,
      content: 'Content of the comment.',
      articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      author: 'Bob McLaren'
    }
  ]
};


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
    res.status(404).json({ message: 'Article not found' });
  }
});

app.get('/articles/:articleId/comments', (req, res) => {
  const articleComments = db.comments.filter(comment => comment.articleId === req.params.articleId);
  res.json(articleComments);
});

app.post('/articles/:articleId/comments', (req, res) => {
  const { content, author } = req.body;
  const newComment = {
    id: uuidv4(),
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
