const
  mongoose = require("mongoose"),
  bcrypt = require("bcryptjs"),
  config = require("../models/database"),

// User Schema
  UserSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
  }),

  User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  User.findOne(query, callback);
}
