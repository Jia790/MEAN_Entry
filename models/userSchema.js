const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Schema = mongoose.Schema;

//create schema & model for database
const userSchema = new Schema({

    name : {
        type: String,
        required: [true, 'Name field is required']
    },
    username : {
        type: String,
        required: [true, 'Username field is required']
    },

    password : {
        type: String,
        required: [true, 'Password field is required']
    },

    email : {
        type: String,
        required: [true, 'Email field is required']
    }



});

/*Create a Collection (table) of specified name
    with specified schema
    const CollectionName = mongoose.model('name', Schema);
*/
const User = mongoose.model('user', userSchema); // mongodb will make a "users" Collection


// Export to use on other file
module.exports = User;

//functions
module.exports.getUserById = function(id, callback){
    User.findById(id,callback);

}

module.exports.getByUserName = function(username, callback){
    const query = {username: username};
    
    User.findOne(query,callback);

}

module.exports.addUser = function(newUser, callback){
    
    //hashing password
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){

            if(err) throw err;
            newUser.password = hash; // replace plain text password with hashed
            newUser.save(callback);// save entry to database, and call passed in callback function
        });
    });
    

}

module.exports.comparePassword = function(typedPassword, hashedPassword, callback){
    //compare user entered password with hashedPassword to see if it matches
    bcrypt.compare(typedPassword, hashedPassword, function(err, isMatch){
        if(err){throw err};
        callback(null, isMatch);
    });

}