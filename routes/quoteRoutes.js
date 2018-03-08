const express = require('express'); //include express

//we can mount router handler on to this variable.
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Quote = require('../models/quoteSchema');



//routes
router.get('/', function(req, res, next){

    Quote.getQuoteById(req.body.id, function(err, quote){
      console.log(req.body.id);
      if(err){
        console.log(err);
        res.json({success: false, msg:'Failed to get quote'});
      }
  
      else{
        res.json({success: true, msg:'Successfully obtain quote'});
        //res.redirect('/');
      }
    });
    // res.send('responds from quote\'s GET request');
  
  });

router.post('/returnQuotes', function(req, res, next){

  Quote.getQuoteById(req.body.id, function(err, quote){
    // console.log(req.body.id);
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to get quote'});
    }

    else{
      res.json({success: true, msg:'Successfully obtain quote', quoteList : {quote} } );
      //res.redirect('/');
    }
  });

});

router.post('/removeQuote', function(req, res, next){
  
  Quote.removeQuoteById(req.body.id, function(err, quote){
     console.log(req.body.id);
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to removed quote'});
    }

    else{
      res.json({success: true, msg:'Successfully removed quote'} );
      //res.redirect('/');
    }
  });

});

router.post('/add', function(req, res, next){

  
  //res.send('REGISTER');

  let newQuote = new Quote({
    userID: req.body.id,
    name: req.body.name,
    quote: req.body.quote

  });



  Quote.addQuote(newQuote, function(err, quote){
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