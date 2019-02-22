const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const usersRoute = require("./routes/api/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(cors());
app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", usersRoute);

app.use("/", (req, res) => {
  res.status(404).send("route not found");
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
