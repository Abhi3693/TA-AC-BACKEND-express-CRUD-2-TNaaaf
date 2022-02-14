let express = require("express");
const { render } = require("../app");
let Book = require("../models/Book");
let Author = require("../models/Author");
let Category = require("../models/Category");
let router = express.Router();

router.get("/", (req,res,next)=>{
  let newObj = req.query;
  console.log(newObj);
  Book.find(newObj, (err, books)=>{
    console.log(books);
    if(err) return next(err);
    res.render("books", {books});
  })
});

router.get("/new", (req,res,next)=>{
  res.render("addBook");
});


router.post("/", (req,res,next)=> {
  // author = find_author_by_email
  // if no author then create
  // else use the author

  Book.create(req.body ,(err, book)=>{
    console.log(book);
    if(err) return next(err);
    res.render("bookDetails", {book});
  });
  // Author.create(req.body, (err,author)=>{
  //   if(err) return next(err);

  //   Category.create(req.body, (err, category)=>{
  //     if(err) return next(err);

  //     req.body.category = category._id;
  //     req.body.author = author._id;


  //   });
  // });
});

router.get("/:id", (req,res,next)=>{
  let id = req.params.id;
  Book.findById(id).populate("author").populate("category").exec((err,book)=>{
    if(err) return next(err);
    res.render("bookDetails", {book});
  })
});

router.get("/:id/edit", (req,res,next)=>{
  let id = req.params.id;
  Book.findById(id, (err, book)=>{
    if(err) return next(err);
    res.render("updateBook", {book});
  });
});

router.post("/:id/edit", (req,res,next)=>{
  let id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, book)=>{
    if(err) return next(err);
    res.redirect("/books/"+id);
  });
});

router.get("/:id/delete", (req,res,next)=>{
  let id = req.params.id;
  Book.findByIdAndDelete(id, (err, book)=>{
    if(err) return next(err);
    res.redirect("/books/");
  });
});

module.exports = router