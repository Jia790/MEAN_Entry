const express = require('express'); //include express

//we can mount router handler on to this variable.
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/userSchema');



//routes
router.get('/', function(req, res, next){
    
    res.send('Temp responds for GET request');
  
  });

router.post('/register', function(req, res, next){

  
  //res.send('REGISTER');

  let newUser = new User({

    name: req.body.name,
    email : req.body.email,
    username : req.body.username,
    password: req.body.password

  });

  User.addUser(newUser, function(err, user){
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    }

    else{
      res.json({success: true, msg:'Successfully register user'});
      //res.redirect('/');
    }

  });
});


//Check if username is already in use
router.post('/canUseName', function(req, res, next){
  const userName = req.body.username;
  User.getByUserName(userName, function (err, user) {
    if (err) throw err;
    if(!user){
      res.json({success: true, msg: 'Username has not been used yet'});
    }
    else{
      res.json({success: false, msg: 'Username is already in use'});
    }
  });
});

//Authentication
router.post('/authenticate', function(req, res, next){


  const userName = req.body.username;
  const password = req.body.password;

  //beginning of authentication process
  User.getByUserName(userName, function(err, user){
    if(err) throw err;
    if(!user){
      res.json({success : false, msg: 'User not found'});
    } 
    else {

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      
      else if(isMatch){// if password matches the hashed password
      
        // create token
        const token = jwt.sign(user.toObject(), config.secret, {expiresIn: 604800 /*toke expires in 1 week*/ }); 
        

        //after token is created, send a response back
        res.json({success : true, token: `Bearer ${token}`, user : {
          id : user._id,
          name: user.name,
          username: user.username,
          email: user.email
        }});
      }
      else{// if password doesn't match
        res.json({success : false, msg: 'Wrong Password'});
      }

    });
  }

  });
 

});

//Profile 
// passport.authenticate return the authenticated user back in req
router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next){

  res.json({user: req.user});

});

  module.exports = router;