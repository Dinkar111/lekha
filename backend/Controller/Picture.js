const express = require('express');
const router = express.Router();
const multer =require('multer');
const PictureModel = require('../Model/Picture');
const path = require('path');

/**
  * imgapi
  */
 var storage = multer.diskStorage({
    destination: 'ArticleImage',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, 'Article' + Date.now() + ext);
    }
});
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};
var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

router.post('/',upload.single('image'), (req, res) => {
    console.log('i am uploading');
    console.log(req.file)
    let pic = new PictureModel({
        url: req.file.filename
    }); // New object() then populate that frontend data in pic.
    
    pic.save(); // add to database
    res.json(pic) // send response to frontend with userobj.
});



module.exports = router;    

