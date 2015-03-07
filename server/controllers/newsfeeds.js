var Newsfeed = require('../models/news');
var express = require('express');
var router = express.Router();


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
console.log("failed login");
}

router.list = function(req, res) {
  //calls all news in database
  Newsfeed.find(function (err, newsfeeds1){
    if (err) throw err;
    // rendering jade template newsfeed and all news are passed in
    res.render('index', {
      newsfeeds : newsfeeds1
    });  
  });
};

router.get('/admin', ensureAuthenticated, function (req, res) {
  Newsfeed.find(function (err, newsfeeds1) {
    res.render('admin', {newsfeeds: newsfeeds1}) ;
  });
});

//detail page
router.get('/:id'/*, ensureAuthenticated*/, function(req, res) {
  Newsfeed.findOne({_id:req.params.id},
    function(err, newsfeed) {
    res.render('detail', {
      article : newsfeed
    });    
  });
});


//new newsfeed
router.post('/', function(req, res) {
  var newsfeed = new Newsfeed(
  {
    author : req.body.author,
    title : req.body.title,
    body : req.body.body,
    photoURL : req.body.photoURL
  });
  newsfeed.save(function(err){
    if (err) throw err;
    res.redirect("/login_form");
  });   
});

router.get('/logout', function(req, res){
  res.redirect('/');
});

router.get('/admin', function(req, res){
  res.redirect('/');
});
//edit newsfeed
router.put('/:id', ensureAuthenticated, function(req, res) {
  Newsfeed.update({_id:req.params.id},
    { author: req.body.author,
      title: req.body.title,
      body: req.body.body,
    }, function (err, newfeed){
    res.redirect('/');  
  });
});

//delete newsfeed
router.delete('/:id', ensureAuthenticated, function (req, res) {
  Newsfeed.remove({_id:req.params.id},
    function(err, newsfeed) {
  res.redirect('/');  
  });
});

module.exports = router;