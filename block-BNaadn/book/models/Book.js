let mongoose = require("mongoose");
const Author = require("./Author");

let Schema = mongoose.Schema;

let bookSchema = new mongoose.Schema({
  title:{type:String,required:true},
  summary:String,
  pages:Number,
  publication:String,
  cover_image:String,
  category:String,
  author:String,
  name:{type:String},
  email:{type:String},
  country:{type:String},
  category:String,
},{timestamps:true});

let Book = mongoose.model("Book", bookSchema);

module.exports = Book;
