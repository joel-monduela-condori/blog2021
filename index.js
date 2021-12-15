const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const DB = process.env.DB || 'mongodb://localhost/blog2021';
mongoose.connect(DB, {useNewUrlParser: true })
  .then(() => console.log('DB Conectada'));
const app = express();
app.set('view engine','pug');
app.set('views','./views');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const Post  = require ('./models/Post');
app.get('/',(req, res) => {
  Post.find((err, posts) => {
    res.render('index',{ posts: posts });
  });
});
app.get('/new',(req, res) => {
  res.render('new_post');
});
app.post('/new',(req, res) => {
  console.log('Datos recibidos:');
  console.log(req.body);
  const {title, author, topic, content} = req.body;
  const post = new Post({ title, author, topic, content });
  post.save((err,post)=> {
    console.log('Post creado en la BD');
    console.log(post);
    res.redirect('/');
  });
});
app.listen(PORT,() => {
  console.log(`server escuchando en puerto ${PORT}`);
});
