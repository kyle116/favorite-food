const
  jwt = require("jsonwebtoken");


function signup(req, res, next) {
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
