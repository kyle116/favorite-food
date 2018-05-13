const
  jwt = require("jsonwebtoken"),
  User = require("../models/User"),
  config = require("../config/database"),
  passport = require("passport");


function signup(req, res, next) {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    favoriteFood: req.body.favoriteFood,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })

  User.addUser(newUser, (err, user) => {
    if(err) {
      console.log(err);
      res.json({success: false, msg: "Failed to signup"});
    } else {
      res.json({success: true, msg: "User created"})
    }
  });

}

function authenticate(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: "User not found"});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week in seconds
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          // send back custom user object to avoid sending back password
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: "Wrong password"});
      }
    });
  });
}

function show(req, res, next) {
  res.json({user: req.user});
}


module.exports = {
  signup,
  authenticate,
  show
}
