const express = require('express');
const router = express.Router();

const CommentModel = require('../Model/Comment')

router.post('/',function(req, res){
        //atricle_id
        // description
        //user_id
        let commentObj = new CommentModel(req.body);
        commentObj.save();

        CommentModel.findOne({_id:commentObj._id}).populate('user_id').populate('comment_id').exec((err,result)=>{
                if(err){
                        res.status(500).send('oops there is something worng');
                }else{
                        res.send(result)
                }
        });
});


router.get('/article/:id',function(req, res){
        let articleId = req.params.id;

        CommentModel.find({article_id:articleId}).populate('user_id').populate('comment_id').exec((err,result)=>{
                if(err){
                        res.status(500).send('oops there is something worng');
                }else{
                        res.send(result)
                }
        });

});



module.exports = router;