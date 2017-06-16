var express = require('express');
var router = express.Router();
var models = require('../models/registrationModule');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'login', condition: false, success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

/* Login Code*/
router.post('/login', function(req, res, next) {
  var item = {
    email: req.body.email,
    password: req.body.password
  };
  req.check('email', 'Invalid Email Id').isEmail();
  req.check('password', 'Invalid password').isLength({min:'2'});
  var errors = req.validationErrors();
  if(errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.redirect('/');
  } else {
    req.session.success = true;
    var data =  models.loggedIn(item, function (err, data) {
      if(data == "User name or password is wrong"){
        res.redirect('/');
      }
      else {
        req.session.user = data;
        res.redirect('./dashboard');
      }
    });
  }
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
  models.signUp(item, collection);
  res.redirect('./');
});

router.get('/logout', function(req,res,next){
  console.log('Log out Method clicked');
  res.redirect('./');
});
module.exports = router;
