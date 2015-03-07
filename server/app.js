var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var app = express();
var mongoose = require('mongoose');
var newsfeeds = require('./controllers/newsfeeds');
var auth = require('./controllers/auth');

// var cookieParser = require('cookie-parser');
// var session = require('express-session');

// var livereload = require('connect-livereload');
// var livereloadport = 35729;

mongoose.connect('mongodb://tanathan:'+process.env.DBPASS+'@ds045531.mongolab.com:45531/newsfeed');

//middleware
// serves static assets
app.use(express.static(__dirname + '/../public'));
app.use(cookieParser());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.set('view engine', 'jade');

app.use(auth);


//router module
app.use('/newsfeeds', newsfeeds);

// renders main newsfeed page
app.get('/', newsfeeds.list);
app.get('/detail', newsfeeds.list);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//   // yay!
// });

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
