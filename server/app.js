var express = require('express');
var news = require('./controllers/news');
var app = express();
var livereload = require('connect-livereload');
var livereloadport = 35729;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoose = require('mongoose');
mongoose.connect('mongodb://newsfeeder:'+process.env.DBPASS+'@ds051851.mongolab.com:51851/newsfeed');

//.use middleware
app.use('/news', news);
app.use(express.static(__dirname + '/../public'));
app.use(livereload({port: livereloadport}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.set('views',process.cwd() + '/server/views');
app.set('view engine', 'jade');

//Renders Main News list page
app.get('/', news.list);


var server = app.listen( (process.env.PORT || 3000), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Gulp Sass Livereload Foundation Express app listening at http://%s:%s', host, port);

});

