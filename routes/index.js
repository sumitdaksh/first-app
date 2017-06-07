var express = require('express');
var router = express.Router();

var loggedIn = require('../models/userModule');
var signUp = require('../models/userModule');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'login', condition: false });
});

/* Login Code*/
router.post('/login', function(req, res, next) {
  var item = {
    email: req.body.email,
    password: req.body.password
  };
  loggedIn.loggedIn(item);
  res.redirect('./dashboard');
  // console.log('bool');
  // console.log(bool);
});

/* Get Sign Up Page*/
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

/*Post Sign Up Page*/
router.post('/register', function(req, res, next) {
  var collection = 'Users';
  var item = {
    name: req.body.name,
    email: req.body.email,
    contact:req.body.contact,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    Date: new Date()
  };
  signUp.signUp(item, collection);
  res.redirect('./');
});

module.exports = router;
