const express = require('express');
const router = express.Router();

const LikeModel = require('../Model/Like')

router.put('/article/:id',function(req, res){
    //.req.body -> article id and user id
    LikeModel.find({article_id:req.params.id},function(err,result) {
        if(err){
            res.status(500).send('oops')
        }
        if(result.length === 0 ){
            let likeObj = new LikeModel(req.body);
            likeObj.save();
        }else{
            console.log(result)
            LikeModel.findByIdAndUpdate(result[0]._id,req.body,{ new :true}, (err,result)=>{
                if (err) { res.send(' udpate error')
                } else{
                res.send(result)
            }
        })
        }

    })
    
  
  
});


router.get('/article/:id',(req,res) =>{
    LikeModel.findOne({article_id:req.params.id},function(err,likes){
        if(err){
            res.status(500).send('oops there is something worng')
        }else{
             res.send(likes)
        }
    })
})


module.exports = router;