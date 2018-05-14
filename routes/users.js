const
    express = require("express"),
    router = express.Router(),
    usersCtrl = require("../controllers/users"),
    User = require("../models/User"),
    passport = require("passport"),
    jwt = require("jsonwebtoken");

// Signup
router.post("/signup", usersCtrl.signup)

// Authenticate
router.post("/authenticate", usersCtrl.authenticate)

// Profile with protected route
router.get("/profile/", passport.authenticate("jwt", {session: false}), usersCtrl.showCurrentUser)
router.get("/profile/:id", passport.authenticate("jwt", {session: false}), usersCtrl.show)

// Delete user
router.delete("/profile/:id", usersCtrl.deleteUser)

// Update user
router.put("/update/:id", passport.authenticate("jwt", {session: false}), usersCtrl.updateUser)

// Get all users
router.get("/dashboard", passport.authenticate("jwt", {session: false}), usersCtrl.getUsers)

module.exports = router;
