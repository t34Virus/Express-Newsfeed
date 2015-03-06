var News = require('../models/news');
var express = require('express');
var router = express.Router();

//middleware specific to this router
router.use(function (req, res, next){
  console.log('Time: ', Date.now());
  next();
});

//renders new_post form page
router.list =function (req, res){
  //finds articles and sorts them by decending order
  News.find({}).sort({ 'created_at': -1 }).exec(function (err, news){
    if (err) throw err;
    res.render('list', { news : news });
  });
};

//renders edit form from single post
router.get('/new', function (req, res){
  res.render('new');
});

//renders edit form from single post
router.get('/:id/edit', function (req, res){
  News.find({ _id : req.params.id }, function (err, news){
    if (err) throw err;
    res.render('edit', {news : news[0]});
  });
});

//renders admin page with edit and delete
router.get('/admin', function (req, res){
  //render stuff
});

//saves edited post from form page
router.put('/:id', function (req, res){

});

//saves new posts from form page
router.post('/', function (req, res){

  var news = new News (
    {
      title : req.body.title,
      field : req.body.field,
      author: req.body.author,
      url : req.body.url,
      content : req.body.content,
      image : req.body.image
    }
  );

  news.save( function (err, news){
    if (err) throw err;
    res.redirect("/");
  });
});

//renders single post page
router.get('/:id', function (req, res){
  News.find( { _id : req.params.id }, function (err, news){
    if (err) throw err;
    res.render('single', {news : news});
  });  
});

// delete news post
router.delete('/:id', function (req, res){
  News.find({ _id : req.params.id}).remove().exec(function (err){
    if (err) throw err;
    res.redirect("/");
  });

});

module.exports = router;