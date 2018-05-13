const
  express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  cors = require("cors"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  config = require("./config/database");


// Connect to database
mongoose.connect(config.database);
// Connection Success
mongoose.connection.on("connected", () => {
  console.log(`Connected to database ${config.database}`)
})
// Connection Error
mongoose.connection.on("error", (err) => {
  console.log(`Database error: ${err}`)
})

const app = express();
// Helps to redirect to routes when endpoint is hit
const users = require("./routes/users")

// Port Number
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/users", users);
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// Index Route
app.get("/", (req, res) => {
  res.send("Invalid end")
})

// Default Route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "angular-src/index.html"))
})

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
