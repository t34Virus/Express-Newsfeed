var Newsfeed = require('../models/news');
var express = require('express');
var router = express.Router();

router.list = function(req, res) {
  Newsfeed.find(function (err, newsfeeds1){
    console.log(newsfeeds1);
    if (err) throw err;
    res.render('index', {
      newsfeeds : newsfeeds1
    });  
  });
};

//detail page
router.get('/detail', function(req, res) {
  Newsfeed.findOne({_id:req.params.id},
    function(err, newsfeed){
      if (err) throw err;
      res.render('detail', {newsfeed: newsfeed});
    });
});


//new newsfeed
router.post('/', function(req, res) {
  var newsfeed = new Newsfeed(
  {
    author : req.body.author,
    title : req.body.title,
    body : req.body.body,
    created : new Date(),
    photoURL : req.body.photoURL
  });
  newsfeed.save(function(err){
    if (err) throw err;
    res.redirect("/");
  });   
});

//edit newsfeed
router.put('/:id', function(req, res) {
  Newsfeed.update({_id:req.params.id},
    { author: req.body.author,
      title: req.body.title,
      body: req.body.body,
    }, function (err, newfeed){
    res.redirect('/');  
  });
});

//delete newsfeed
router.delete('/:id', function (req, res) {
  Newsfeed.remove({_id:req.params.id},
    function(err, newsfeed) {
  res.redirect('/');  
  });
});


module.exports = router;