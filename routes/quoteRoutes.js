const express = require('express'); //include express

//we can mount router handler on to this variable.
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Quote = require('../models/quoteSchema');



//routes
router.get('/', function(req, res, next){
    
    res.send('responds from quote\'s GET request');
  
  });

router.post('/add', function(req, res, next){

  
  //res.send('REGISTER');

  let newQuote = new Quote({
    userID: req.body.id,
    name: req.body.name,
    quote: req.body.quote

  });

  Quote.addQuote(newQuote, function(err, user){
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to register quote'});
    }

    else{
      res.json({success: true, msg:'Successfully register quote'});
      //res.redirect('/');
    }

  });
});

  module.exports = router;