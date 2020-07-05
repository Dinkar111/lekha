const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    count:  { type: Number, default: 0 },
    article_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'article'}
})

const LikeModel = mongoose.model('like', LikeSchema);

module.exports = LikeModel;