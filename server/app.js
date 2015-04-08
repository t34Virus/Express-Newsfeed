var express = require('express');
var app = express();
var livereload = require('connect-livereload');
var livereloadport = 35729;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var news = require('./controllers/news');
var auth = require('./controllers/auth');
var mongoose = require('mongoose');

mongoose.connect('mongodb://newsfeeder:'+process.env.DBPASS+'@ds051851.mongolab.com:51851/newsfeed');

//.use middleware
app.use(express.static(__dirname + '/../public'));
app.use(cookieParser());
app.use(livereload({port: livereloadport}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//auth controller
app.use(auth);

app.use('/news', news);

app.set('views',process.cwd() + '/server/views');
app.set('view engine', 'jade');


//Renders Main News list page
app.get('/', news.list);


var server = app.listen( (process.env.PORT || 3000), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Gulp Sass Livereload Foundation Express app listening at http://%s:%s', host, port);

});

