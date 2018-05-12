const
  jwt = require("jsonwebtoken"),
  User = require("../models/User"),
  passport = require("passport");


function signup(req, res, next) {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body, password
  })
  res.send("signup");
}

function authenticate(req, res, next) {
    res.send("Auth");
}

function show(req, res, next) {
    res.send("Profile");
}


module.exports = {
  signup,
  authenticate,
  show
}
