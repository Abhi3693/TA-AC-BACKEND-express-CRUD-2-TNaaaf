let express = require('express');
let mongoose = require('mongoose');
let Article = require('../models/blog');
let Comment = require('../models/comment');

let router = express.Router();

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndDelete(id, (err, comment) => {
    Article.findByIdAndUpdate(
      comment.articleId,
      { $pull: { comments: comment._id } },
      (err, updatedArticle) => {
        if (err) return next(err);
        res.redirect('/articles/' + updatedArticle._id);
      }
    );
  });
});

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if (err) return next(err);
    res.render('updateComment', { comment });
  });
});

router.post('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, comment) => {
    if (err) return next(err);
    res.redirect('/articles/' + comment.articleId);
  });
});

router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, comment) => {
    if (err) return next(err);
    res.redirect('/articles/' + comment.articleId);
  });
});

router.get('/:id/disLike', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, { $inc: { disLikes: 1 } }, (err, comment) => {
    if (err) return next(err);
    res.redirect('/articles/' + comment.articleId);
  });
});

module.exports = router;
