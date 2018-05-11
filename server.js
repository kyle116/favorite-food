const 
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  passport = require("passport"),
  mongoose = require("mongoose");
  
const app = express();

// Port Number
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Index Route
app.get("/", (req, res) => {
  res.send("Invalid end")
})

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})