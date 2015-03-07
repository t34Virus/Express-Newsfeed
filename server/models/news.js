var mongoose = require('mongoose');

//Mongoose Schema
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



module.exports = mongoose.model('News', article);
