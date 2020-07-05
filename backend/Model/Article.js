const mongoose = require('mongoose');

const ArticleSchema =mongoose.Schema({
    title: String,
    description: String,
    created_date: { type: Date, default: Date.now },
    user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    comment_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' },
    like_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'like' },
    picture:String
})
const ArticleModel = mongoose.model('article', ArticleSchema); //naming a table

module.exports = ArticleModel;

