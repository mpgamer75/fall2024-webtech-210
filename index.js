const express = require("express");
const app = express();

app.use(express.json());

const articlesRouter = require('./routes/articles');
const commentsRouter = require('./routes/comments');

app.use('/articles', articlesRouter);
app.use('/articles', commentsRouter);  // Les commentaires sont basés sur les articles

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
