const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userSchema'); // bring in user model contain
const config = require('../config/database'); // bring in database info

//export passport for use, 
module.exports = function(passport){// this 'passport' is passed in from server.js
    let opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    opts.secretOrKey = config.secret;

    //strategy configuration
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        //console.log(jwt_payload)
        User.getUserById(jwt_payload._id, function(err, user){
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
    }));
}