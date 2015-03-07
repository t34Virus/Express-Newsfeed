var mongoose = require('mongoose');

//Mongoose Schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String
});

UserSchema.methods.validPassword = function (password){
  return this.password == password;
};

module.exports = mongoose.model('user', UserSchema);