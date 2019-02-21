const express = require("express");
const mongoose = require("mongoose");

const usersRoute = require("./routes/api/users");

const app = express();

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use("/api/users", usersRoute);

app.use("/", (req, res) => {
  res.send("route not found");
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
