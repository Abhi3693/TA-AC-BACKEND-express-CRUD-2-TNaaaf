var express = require('express');
const { request } = require('../app');
var router = express.Router();
let Article = require("../models/articleModel");

/* GET users listing. */
router.get('/', function(req, res, next) {
  Article.find({}, (err, articles)=>{
    if(err) return next(err);
    res.render('articles', {articles:articles});
  });
});

router.get("/new", (req,res,next)=>{
  res.render("addArticle");
});

router.post("/", (req,res,next)=>{
  Article.create(req.body, (err, article)=>{
    if(err) return next(err);
    res.render('singleArticle', {article:article});
  });
});

router.get("/:id", (req,res,next)=>{
  let id = req.params.id;
  Article.findById(id, (err, article)=>{
    res.render("singleArticle", {article:article});
  });
});

router.get("/:id/edit", (req,res,next)=>{
  let id = req.params.id;
  Article.findById(id, (err, article)=>{
    console.log(article);
    if(err) return next(err);
    res.render('updateArticle', {article:article});
  });
});

router.post("/:id/edit", (req,res,next)=>{
  let id = req.params.id;
console.log(req.body);
  Article.findByIdAndUpdate(id,req.body,{new:true}, (err, article)=>{
    if(err) return next(err);
    res.render('singleArticle', {article:article});
  });
});

router.get("/:id/delete", (req,res,next)=>{
  let id = req.params.id;
  Article.findByIdAndDelete(id, (err, article)=>{
    if(err) return next(err);
    res.redirect('/articles');
  });
});

router.get("/:id/like", (req,res,next)=>{
  let id = req.params.id;
  let updateLikes = 0;
  Article.findById(id, (err, article)=>{
    updateLikes = article.likes + 1;
    if(err) return next(err);
    Article.findByIdAndUpdate(id,{likes:updateLikes},{new:true}, (err, article)=>{
      if(err) return next(err);
      res.render('singleArticle', {article:article});
    });
  });  
});

router.get("/:id/disLike", (req,res,next)=>{
  let id = req.params.id;
  let updateDisLikes = 0;
  Article.findById(id, (err, article)=>{
    updateDisLikes = article.disLikes + 1;
    if(err) return next(err);
    Article.findByIdAndUpdate(id,{disLikes:updateDisLikes},{new:true}, (err, article)=>{
      if(err) return next(err);
      res.render('singleArticle', {article:article});
    });
  });
});

module.exports = router;
