const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const db = {
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

router.get('/:articleId/comments', (req, res) => {
  const articleComments = db.comments.filter(comment => comment.articleId === req.params.articleId);
  res.json(articleComments);
});

router.post('/:articleId/comments', (req, res) => {
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

router.get('/:articleId/comments/:commentId', (req, res) => {
  const comment = db.comments.find(
    comment => comment.id === req.params.commentId && comment.articleId === req.params.articleId
  );
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Commentaire non trouvé' });
  }
});

module.exports = router;
