var express = require('express');
var app = express();
var livereload = require('connect-livereload');
var livereloadport = 35729;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newsfeed');

app.use(express.static(__dirname + '/../public'));
app.use(livereload({port: livereloadport}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.set('view engin', 'jade');


app.get('/', function (req, res) {
  res.render('index', { template_engine : "Jade" });
});


var server = app.listen( (process.env.PORT || 3000), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Gulp Sass Livereload Foundation Express app listening at http://%s:%s', host, port);

});

