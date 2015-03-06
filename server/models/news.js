var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var newsfeedSchema = new Schema({
  author : String,
  title : String,
  body : String,
  created : Date,
  photoURL: String
});

module.exports = mongoose.model('newsfeeds', newsfeedSchema);
