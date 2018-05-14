const
  mongoose = require("mongoose"),
  bcrypt = require("bcryptjs"),
  config = require("../config/database"),

// User Schema
  UserSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true, min: 0, max: 200},
    favoriteFood: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
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

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    })
  })
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.deleteUser = function(id, callback) {
  User.findByIdAndRemove(id, callback);
}

module.exports.updateUser = function(id, data, callback) {
  User.findById(id, (err, updatedUser) => {
    if(err) throw err;
    updatedUser.firstName = data.firstName;
    updatedUser.lastName = data.lastName;
    updatedUser.age = data.age;
    updatedUser.favoriteFood = data.favoriteFood;
    updatedUser.username = data.username;
    updatedUser.email = data.email;
    // Change password only if password value is passed in
    if(data.password !== "") {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
          if(err) throw err;
          updatedUser.password = hash;
          updatedUser.save();
        })
      })
    }

    updatedUser.save();
    callback(err, updatedUser);
  })
}
