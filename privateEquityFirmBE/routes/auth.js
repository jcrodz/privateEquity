var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');

// Our user model
const User           = require("../model/user");

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


router.post("/login", function(req, res) {

  if(req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
  }

  if (username === "" || password === "") {
    res.status(401).json({message:"fill up the fields"});
    return;
  }

  User.findOne({ "username": username }, (err, user)=> {

  	if( ! user ){
	    res.status(401).json({message:"no such user found"});
	  } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        console.log(isMatch);
        if (!isMatch) {
          res.status(401).json({message:"passwords did not match"});
        } else {
        	console.log('user in findOne routes', user);
          var payload = {id: user._id, user: user.username};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          console.log('token in findOne routes', token)
          res.json({message: "ok", token: token, user: user});
        }
      });
    }
  })
});

router.post("/signup", (req, res, next) => {
    console.log(req.body);
  var company  = req.body.company;
  var contactName = req.body.contactName;
  var username = req.body.username;
  var password = req.body.password;
  var contactPhone = req.body.contactPhone;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var country = req.body.country;
  var role = req.body.role;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'user exist' });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      company,
      contactName,
      username,
      password: hashPass,
      contactPhone,
      address,
      city,
      state,
      country,
      role
    });

    console.log('before save', newUser);

    newUser.save((err, user) => {
        console.log('post inside express', user);
      if (err) {
        res.status(400).json({ message: err });
      } else {
        var payload = {id: user._id, user: user.username};

        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({message: "ok", token: token, user: user});
      	// res.status(200).json(user);
      }
    });
  });
});

router.post("/investor", (req, res, next) => {
    console.log(req.body);
  var company  = req.body.company;
  var contactName = req.body.contactName;
  var username = req.body.username;
  var password = req.body.password;
  var contactPhone = req.body.contactPhone;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var country = req.body.country;
  var role = req.body.role;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'user exist' });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      company,
      contactName,
      username,
      password: hashPass,
      contactPhone,
      address,
      city,
      state,
      country,
      role
    });

    console.log('before save', newUser);

    newUser.save((err, user) => {
        console.log('post inside express', user);
      if (err) {
        res.status(400).json({ message: err });
      } else {
        var payload = {id: user._id, user: user.username};

        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({message: "ok", token: token, user: user});
      	// res.status(200).json(user);
      }
    });
  });
});



module.exports = router;
