const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Schema = mongoose.Schema;

//create schema & model for database
const entrySchema = new Schema({

    userID : {
        type: String,
        required: [true, 'UserID is required']
    },
    name : {
        type: String,
        required: [true, 'Username field is required']
    },

    entry : {
        type: String,
        required: [true, 'Password field is required']
    }



});

/*Create a Collection (table) of specified name
    with specified schema
    const CollectionName = mongoose.model('name', Schema);
*/
const Entrys = mongoose.model('entry', entrySchema); // mongodb will make a "users" Collection


// Export to use on other file
module.exports = Entrys;

//functions

//Get quotes from database based on provided id
module.exports.getEntryById = function(id, callback){
    const query = {userID: id};
    Entrys.find(query,callback);

}

//Remove quotes fromd database based on provided id
module.exports.removeEntryById = function(id, callback){
    const query = {_id: id};
    Entrys.findOneAndRemove(query,callback);

}

module.exports.addEntry = function(newEntry, callback){
    
    newEntry.save(callback);// save entry to database, and call passed in callback function 

}

