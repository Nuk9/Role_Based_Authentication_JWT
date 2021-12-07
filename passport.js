const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = req => {
  let token = null;
  if(req && req.cookie){
    token = req.cookie["access_token"];
  }
  return token;
}

// authorization - when we want to protect the resources
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: "focusCollege"
    },(payload, done)=>{
      User.findById({_id: payload.sub}, (err, user) => {
        if(err){
          return done(err, false);
        }
        if(User){
          return done(null, user);
        }else{
          return done(null, false);
        }
      })
}));


// authentication for local strategy username and password - we use it when we login
passport.use(new localStrategy((username, password, done)=>{
  User.findOne({ username },(err,user) => {
    // something went wrong with database 
    if(err){
      return done(err);
    }
    // if no user exist
    if(!user){
      return done(null, false)
    }
    // check if the password is correct
    user.comparePassword(password, done);
  })
}))
