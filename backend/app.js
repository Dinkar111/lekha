
const express=require('express')
const app= express();
const cors = require('cors');
app.use(cors());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With","Authorization");
    next();
 });
 
 app.use(express.static('ArticleImage'));
const bodyParser=require('body-parser')
const mongoose=require('mongoose');

 
const UserController = require('./Controller/User');
const ArticleController = require('./Controller/Article');
const CommentController = require('./Controller/Comment');
const PictureController = require('./Controller/Picture');
const LikeController = require('./Controller/Like');




mongoose.connect('mongodb://127.0.0.1:27017/Lekha',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())



app.use('/api/user',UserController);
app.use('/api/article',ArticleController);
app.use('/api/comment',CommentController);
app.use('/api/picture',PictureController);
app.use('/api/like',LikeController);




app.listen(8080, () => console.log('server is running'));