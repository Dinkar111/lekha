const mongoose = require('mongoose');

const PictureSchema = mongoose.Schema({
    url: String
});

const PictureModel = mongoose.model('picture',PictureSchema); //naming table
/**
 * es5
 */
module.exports = PictureModel;