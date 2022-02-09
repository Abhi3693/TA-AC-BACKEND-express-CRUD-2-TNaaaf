let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: String,
    description: String,
    tags:[String],
    author:String,
    likes:{type:Number, default: 0},
    disLikes:{type:Number, default: 0},
});

let Article = mongoose.model("Article", articleSchema);

module.exports = Article;