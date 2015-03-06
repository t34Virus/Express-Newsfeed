var express = require('express');
var app = express();
var livereload = require('connect-livereload');
var livereloadport = 35729;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newsfeed');
