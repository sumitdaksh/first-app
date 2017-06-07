var express = require('express');
var router = express.Router();
var signUp = require('../models/userModule');
var getData = require('../models/dataModel');
/* GET dashboard listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard/index',{title:'Dashboard Page'});
});

router.get('/add-user', function(req, res, next) {
  console.log('dashboard/add-user');
  res.render('dashboard/add-user',{ title:'Add User Page'});
});

router.post('/add-user', function(req, res, next) {
  console.log('req.body');
  console.log(req.body);
  var collection = 'Employee'
  var item = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email:req.body.email,
    contact: req.body.Contact,
    gender_type: req.body.gender_type,
    Address: req.body.Address,
    Date: new Date()
  };
  signUp.signUp(item,collection);
  res.redirect('./add-user');
});

router.get('/user', function(req, res, next) {
   var data = signUp.GetData();
   if(data)
     console.log(signUp.GetData());
    //  console.log('getData.UserModel');
     var data = getData.UserModel
    //  console.log(data);
   res.render('dashboard/user',{ title:'User Page', userPosts: data});
});

module.exports = router;
