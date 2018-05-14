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
      res.json({success: true, msg: "User created"});
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

function showCurrentUser(req, res, next) {
  res.json({user: req.user});
}

function show(req, res, next) {
  User.getUserById(req.params.id, (err, user) => {
    res.json({user: user});
  })

}

function deleteUser(req, res, next) {
  User.deleteUser(req.params.id, (err, user) => {
    if(err) throw err;
    res.json({success: true, msg: "User deleted"});
  })
}

function updateUser(req, res, next) {
  User.updateUser(req.user._id, req.body, (err, user) => {
    if(err) throw err;
    return res.json({success: true, msg: "Update"});
  })
}

function getUsers(req, res, next) {
  User.getUsers((err, allUsers) => {
    if(err) throw err;
    return res.json({success: true, msg: "All users returned", users: allUsers});
  })
}

module.exports = {
  signup,
  authenticate,
  show,
  deleteUser,
  updateUser,
  getUsers,
  showCurrentUser
}
