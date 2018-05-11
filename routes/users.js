const
    express = require("express"),
    router = express.Router();

// Signup
router.get("/signup", (req, res, next) => {
    res.send("signup");
})

// Authenticate
router.get("/authenticate", (req, res, next) => {
    res.send("Auth");
})

// Profile
router.get("/profile", (req, res, next) => {
    res.send("Profile");
})

// Validate
router.get("/validate", (req, res, next) => {
    res.send("Validate");
})

module.exports = router;