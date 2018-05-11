const
    express = require("express"),
    router = express.Router();

// Signup
router.post("/signup", (req, res, next) => {
    res.send("signup");
})

// Authenticate
router.post("/authenticate", (req, res, next) => {
    res.send("Auth");
})

// Profile
router.get("/profile", (req, res, next) => {
    res.send("Profile");
})

module.exports = router;