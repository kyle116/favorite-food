const dotenv = require('dotenv').load();

module.exports = {
    database: process.env.MONGO_URL,
    secret: "supersecret"
}
