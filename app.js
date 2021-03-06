var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
// var RedisStore = require('connect-redis')(express);
var requestChecker  =   require('./middleware/auth.js');

var index = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var error = require('./routes/error');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/nodejs.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'max', saveUninitialized: true, resave: false}));

// app.use(express.session({ store: new RedisStore }));
// app.use(express.session({ store: new RedisStore({
//   host:'127.0.0.1',
//   port:6380,
//   prefix:'sess'
// }), secret: 'SEKR37' }));

app.use('/', index);
app.use('/users', users);
app.use('/dashboard', dashboard);
app.use('/error', error);

// catch 404 and forward to error handler
app.use(requestChecker);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.redirect('/error');
  res.render('error');
});

module.exports = app;
