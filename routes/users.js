var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  var data = req.session.user;
  res.render('users/index',{title:'hello', data: data});
});

module.exports = router;
