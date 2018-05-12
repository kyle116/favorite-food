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

// Profile
router.get("/profile", usersCtrl.show)

module.exports = router;
