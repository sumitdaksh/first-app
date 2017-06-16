var express = require('express');
var router = express.Router();
var userModel = require('../models/userModule');
var signUp = require('../models/registrationModule');
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
  var collectionName = 'Employee'
   var datas = userModel.GetData('Employee', function(err,doc){
    //  var data = getData.UserModel
     res.render('dashboard/user',{ title:'User Page', userPosts: doc});
   })
});

router.get('/logout', function(req, res, next) {
   res.redirect('/');
});

router.get('/edit/:id', function(req, res, next) {
  console.log('Request Id:', req.params.id);
  res.redirect('/dashboard/user');
});

router.get('/delete/:email', function(req, res, next) {
  var collectionName = 'Employee';
  var query =  req.params.email;
   if(query) {
      var datas = userModel.deleteEmployee(collectionName,query,function(err,doc){
        res.redirect('/dashboard/user');
    });
  } else {
      res.redirect('/dashboard/user');
  }
});
router.post('/update-user', function(req, res, next) {
  var collectionName = 'Employee';
  var item = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email:req.body.email,
    contact: req.body.Contact,
    gender_type: req.body.gender_type,
    Address: req.body.Address
  }
  var datas = userModel.updateEmployee(collectionName,query,function(err,doc){
    res.redirect('/dashboard/user');
  });
});
module.exports = router;
