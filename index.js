require("dotenv").config();
var express = require("express");
var app = express();
var sequelize = require("./db");
var bodyParser = require("body-parser");
var inventory = require("./controller/inventory");
var user = require("./controller/usercontroller");

sequelize.sync(); // tip: {force: true} for resetting tables
app.use(bodyParser.json());
app.use(require("./middleware/headers"));

app.use("/api/user", user);

//Protected Routes
app.use(require("./middleware/validate-session"));
app.use("/inventory", inventory);
app.listen(process.env.PORT, function() {
  console.log(`app is listening on ${process.env.PORT} and hello world`);
});
