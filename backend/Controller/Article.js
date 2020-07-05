const express = require('express');
const router = express.Router();
const multer =require('multer');
const ArticleModel = require('../Model/Article');
const path = require('path');
// api/article/ 
router.post('/',function(req, res){
    // req.body
    console.log(req.body);

    let articleobj = new ArticleModel(req.body); // New object() then populate that frontend data in userobj.
    articleobj.save(); // add to database
    res.json(articleobj) // send response to frontend with userobj.
    // adding data to database
    
});

router.get('/',function(req, res){
    // req.body
    // give all the rows

    ArticleModel.find({}).populate('user_id').populate('comment_id').sort({'_id': -1}).exec((err,result)=>{
        if(err){
            res.send(500).send('oops');

        }
        res.json(result);
    })
  
});

/**
 * get specific user article
 */
router.get('/user/:id',function(req, res){
    // req.body
    // give all the rows
    let id = req.params.id;
    ArticleModel.find({user_id:id}).exec((err,result)=>{
        if(err){
            res.send(500).send('oops');

        }
        res.json(result);
    })
  
});

///api/article/:Articleid
router.get('/:Articleid',function(req ,res){

    let uid =req.params.Articleid.toString();

    ArticleModel.findOne({_id: uid}).populate('user_id').populate('comment_id').exec((err,result)=>{
        if (err || !uid) { 
            res.status(500).send(' udpate error');
        } else{
            res.send(result);
        }
    })
  
});


/**
 * edit
 */
///api/article/:Articleid
router.put('/:Articleid',function(req ,res){

    let uid =req.params.Articleid.toString();
    ArticleModel.findByIdAndUpdate(uid,req.body,{ new :true}, (err,uid)=>{
        if (err || !uid) { 
            res.status(500).send(' udpate error');
        } else{
            res.send(uid);
        }
    })
});

/**
 * delte
 */
router.delete('/:id',function(req,res){
    ArticleModel.findByIdAndDelete(req.params.id).then(function(err,result){
        if(err){
           res.status(500).send('oops')
        }
      else{
        res.json(result);
      }
    })
})

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

router.post('/uploadImg/:articleId',upload.single('image'), (req, res) => {
    console.log('i am uploading');
    let articleId= req.params.articleId;
    ArticleModel.findByIdAndUpdate(articleId,{ image:req.file.filename },{ new :true}, (err,result)=>{
        if (err)  res.status(500).send(' udpate error')
        res.send(result)  
   });
});


router.get('/search/:searchquery',function(req, res){
    // req.body
    // give all the rows

    ArticleModel.find({title:new RegExp('^'+req.params.searchquery+'$','i')}).populate('user_id').populate('comment_id').exec((err,result)=>{
        if(err){
            res.send(500).send('oops');

        }
        res.json(result);
    })
  
});


module.exports = router;    

