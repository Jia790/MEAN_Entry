//Express App set up
const express = require('express');
const path = require('path');

//include body parser for extracting data from request
const bodyParser = require('body-parser');

//cross origion resource sharing, for request from different ports
const cors = require('cors'); 
//passport for creating the login authentication
const passport = require('passport');

//using as object document mapper, to work with Mongodb
const mongoose = require('mongoose');
const compression = require('compression');
const config = require('./config/database');

/* if database does not exist, it will be created
   when you create a first entry in the collection
*/
mongoose.connect(config.database);

mongoose.connection.on('connected', function(){
    console.log("connected to database "+ config.database);
});


mongoose.connection.on('error', function(err){
    console.log("error occurred during connection "+ err);
});

//set up express app
const app = express();
//const port = 3001;

// This is for deploying on heroku
const port = process.env.PORT || 8080;


// set mongoose's Promise to Node.js's Promise
//mongoose.Promise = global.Promise; 



//Middleware 

//set static folder
app.use(express.static(path.join(__dirname +'/public'))); // serves static files such as html, css, image, etc

app.use(cors()); // allows request to api from different domain name

app.use(bodyParser.json()); // parses incoming request bodys
app.use(bodyParser.urlencoded({extended:true}));
app.use(compression());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport); //using passport.js

//use created routes from userRoutes.js
app.use('/user', require('./routes/userRoutes'));
app.use('/entry', require('./routes/entryRoutes')); //look here

//send all other not vaild path to homepage
app.get('*', function (req,res) {
    res.redirect('/');
  });

app.listen(port, function(){
    console.log("server started on port " + port);
})