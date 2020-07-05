const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    description: String,
    created_at: { type: Date, default: Date.now },
    user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    article_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'article'}
})

const CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel;