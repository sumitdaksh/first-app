var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('error', {title:'Page Not Found'});
});

module.exports = router;
