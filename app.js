var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override');
var livereload = require('connect-livereload');
var livereloadport = 35729;

var mongoose = require('mongoose');
mongoose.connect('mongodb://tanathan:'+process.env.DBPASS+'@ds045531.mongolab.com:45531/newsfeed');
var Schema = mongoose.Schema;

var newsfeedSchema = new Schema({
  author : String,
  title : String,
  body : String,
  created : Date,
  photoURL: String
});

var Newsfeed = mongoose.model('newsfeeds', newsfeedSchema);

// serves static assets
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  Newsfeed.find(function (err, newsfeeds1){
    console.log(newsfeeds1);
    if (err) throw err;
    res.render('index', {
      newsfeeds : newsfeeds1
    });  
  });
});

//READ.JADE
// app.get('/newsfeeds/:id', function (req, res) {
//   Newsfeed.findOne({_id:req.params.id},
//     function(err, news){
//     if (err) throw err;
//     res.render('edit_newsfeed', {newsfeed: newsfeed });  
//   });
// });

// app.get('/new_newsfeed', function (req, res) {
//   res.render('new_newsfeed');  
// });

//new newsfeed
app.post('/newsfeeds', function (req, res) {
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
app.put('/newsfeeds/:id', function (req, res) {
  Newsfeed.update({_id:req.params.id},
    { author: req.body.author,
      title: req.body.title,
      body: req.body.body,
    }, function (err, newfeed){
    res.redirect('/');  
  });
});

//renders newsfeeds from db
// app.get('/newsfeeds', function(req,res){
//   Newsfeed.find(function(err, newsfeeds){
//     console.log("MY: " + newsfeeds);
//     if (err) throw err;
//     res.render('newsfeeds', {newsfeeds: newsfeeds});
//   });
// });

//delete newsfeed
app.delete('/newsfeeds/:id', function (req, res) {
  Newsfeed.remove({_id:req.params.id},
    function(err, newsfeed) {
  res.redirect('/');  
  });
});
// app.get('/new_newsfeed', function (req, res) {
//   res.render('new_newsfeed');  
// });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
