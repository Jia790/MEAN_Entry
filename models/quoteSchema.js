const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Schema = mongoose.Schema;

//create schema & model for database
const quoteSchema = new Schema({

    userID : {
        type: String,
        required: [true, 'UserID is required']
    },
    name : {
        type: String,
        required: [true, 'Username field is required']
    },

    quote : {
        type: String,
        required: [true, 'Password field is required']
    }



});

/*Create a Collection (table) of specified name
    with specified schema
    const CollectionName = mongoose.model('name', Schema);
*/
const Quote = mongoose.model('quote', quoteSchema); // mongodb will make a "users" Collection


// Export to use on other file
module.exports = Quote;

//functions
module.exports.getQuoteById = function(id, callback){
    Quote.findById(id,callback);

}

module.exports.addQuote = function(newQuote, callback){
    
            newQuote.save(callback);// save entry to database, and call passed in callback function 

}

