module.exports = function(req,res,next) {
  console.log('Hello User')
  if (req.session && req.session.user) {
     console.log('req.user.email')
     console.log(req.session.user.email)
     User.findOne({ email: req.session.user.email }, function(err, user) {
     if (user) {
       req.user = user;
      //  delete req.user.password; delete the password from the session
       req.session.user = user;  //refresh the session value
       res.locals.user = user;
     }
     // finishing processing the middleware and run the route
     next();
     });
   } else {
     next();
   }
};
