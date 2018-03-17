const express = require('express'); //include express

//we can mount router handler on to this variable.
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Entrys = require('../models/entrySchema');



//routes
router.get('/', function(req, res, next){

    Entrys.getEntryById(req.body.id, function(err, entry){
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

router.post('/returnEntries', function(req, res, next){

  Entrys.getEntryById(req.body.id, function(err, entry){
    // console.log(req.body.id);
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to get entry'});
    }

    else{
      res.json({success: true, msg:'Successfully obtain entry', entryList : {entry} } );
      //res.redirect('/');
    }
  });

});

router.post('/removeEntry', function(req, res, next){
  
  Entrys.removeEntryById(req.body.id, function(err, entry){
     //console.log(req.body.id);
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to removed entry'});
    }

    else{
      res.json({success: true, msg:'Successfully removed entry'} );
      //res.redirect('/');
    }
  });

});

router.post('/add', function(req, res, next){

  
  //res.send('REGISTER');

  let newEntry = new Entrys({
    userID: req.body.id,
    name: req.body.name,
    entry: req.body.entry

  });



  Entrys.addEntry(newEntry, function(err, entry){
    if(err){
      console.log(err);
      res.json({success: false, msg:'Failed to register entry'});
    }

    else{
      res.json({success: true, msg:'Successfully register entry'});
      //res.redirect('/');
    }

  });
});

  module.exports = router;