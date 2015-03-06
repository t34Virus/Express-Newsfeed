var express = require('express');
var app = express();
var livereload = require('connect-livereload');
var livereloadport = 35729;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoose = require('mongoose');
mongoose.connect('mongodb://newsfeeder:'+process.env.DBPASS+'@ds051851.mongolab.com:51851/newsfeed');
var Schema = mongoose.Schema;

var article = new Schema({
  title: String,
  field: String,
  author: String,
  url: String,
  created_at: {type: Date, default: Date.now},
  content: String,
  image: String
});

var News = mongoose.model('News', article);

app.use(express.static(__dirname + '/../public'));
app.use(livereload({port: livereloadport}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('views',process.cwd() + '/server/views');
app.set('view engine', 'jade');



//show all news articles :: newly added news, renders news feed
app.get('/', function (req, res) {

  res.render('single');
  //finds articles and sorts them by decending order
  News.find({}).sort({ 'created_at': -1 }).exec(function (err, news){
    if (err) throw err; 
    res.render('list', { news : news });
  });
});

//renders new_post form page
app.get('/new', function (req, res){
  res.render('new');
});

//renders edit form from single post
//app.get('/:id/edit', function (req, res){});

//saves new posts from form page
app.post('/news', function (req, res){

  var news = new News (
    {
      title : req.body.title,
      field : req.body.field,
      author: req.body.author,
      project_url : req.body.url,
      body : req.body.content,
      image : req.body.image
    }
  );

  news.save( function (err, news){
    if (err) throw err;
    res.redirect("/");
  });
});

//renders single post page
app.get('/news/:id', function (req, res){
  res.render('single');
});

//delete news post
app.delete('/news/:id', function (req, res){
  News.find({ _id : req.params.id}).remove().exec(function (err){
    if (err) throw err;
    res.redirect("/");
  });

});


var server = app.listen( (process.env.PORT || 3000), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Gulp Sass Livereload Foundation Express app listening at http://%s:%s', host, port);

});

