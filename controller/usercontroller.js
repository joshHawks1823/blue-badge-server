var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../model/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

//Creating New User
router.post("/createuser", function(req, res) {
  var userName = req.body.user.username;
  var password = req.body.user.password;
  User.create({
    username: userName,
    passwordhash: bcrypt.hashSync(password, 10) //1 ADD THIS TO THE PROPERTY VALUE
  }).then(
    function createSuccess(user) {
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });
      res.json({
        user: user,
        message: "created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

//SIGNING IN A USER
router.post("/signin", function(req, res) {
  User.findOne({ where: { username: req.body.user.username } }).then(
    function(user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.passwordhash, function(
          err,
          matches
        ) {
          //1
          if (matches) {
            //2
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              //3
              user: user,
              message: "successfully authenticated",
              sessionToken: token
            });
          } else {
            //4
            res.status(502).send({ error: "you failed, yo" });
          }
        });
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    function(err) {
      res.status(501).send({ error: "you failed, yo" });
    }
  );
});

module.exports = router;
