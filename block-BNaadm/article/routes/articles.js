let express = require('express');
let mongoose = require('mongoose');
let Article = require('../models/blog');
let Comment = require('../models/comment');

let router = express.Router();

router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('articles', { articles });
  });
});

router.get('/new', (req, res, next) => {
  res.render('addArticle');
});

router.post('/', (req, res, next) => {
  Article.create(req.body, (err, article) => {
    if (err) return next(err);
    res.redirect(`/articles/${article._id}`);
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id)
    .populate('comments')
    .exec((err, article) => {
      if (err) return next(err);
      console.log(article.comments);
      res.render('singleArticle', { article });
    });
});

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('updateArticle', { article });
  });
});

router.post('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, { new: true }, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    Comment.deleteMany({ articleId: id }, (err, info) => {
      res.redirect('/articles');
    });
  });
});

router.get('/:id/like', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true },
    (err, article) => {
      if (err) return next(err);
      res.redirect('/articles/' + id);
    }
  );
});

router.get('/:id/disLike', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    let addDislike = article.disLikes + 1;
    Article.findByIdAndUpdate(
      id,
      { $inc: { disLikes: 1 } },
      { new: true },
      (err, article) => {
        if (err) return next(err);
        res.redirect('/articles/' + id);
      }
    );
  });
});

router.post('/:id/comment', (req, res, next) => {
  let id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, upodatedArticle) => {
        if (err) return next(err);
        res.redirect('/articles/' + id);
      }
    );
  });
});

module.exports = router;
