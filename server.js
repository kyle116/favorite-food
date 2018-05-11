const 
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  passport = require("passport"),
  mongoose = require("mongoose");
  
const app = express();
// Helps to redirect to routes when endpoint is hit
const users = require("./routes/users")

// Port Number
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/users", users)

// Index Route
app.get("/", (req, res) => {
  res.send("Invalid end")
})

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})