const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const db = {
  articles: [
    {
      id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      title: 'My article',
      content: 'Content of the article.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    }
  ]
};

router.get('/', (req, res) => {
  res.json(db.articles);
});

router.post('/', (req, res) => {
  const { title, content, author } = req.body;
  const newArticle = {
    id: uuidv4(),
    title,
    content,
    date: new Date().toLocaleDateString(),
    author
  };
  db.articles.push(newArticle);
  res.status(201).json(newArticle);
});

router.get('/:articleId', (req, res) => {
  const article = db.articles.find(article => article.id === req.params.articleId);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article non trouvé' });
  }
});

module.exports = router;
