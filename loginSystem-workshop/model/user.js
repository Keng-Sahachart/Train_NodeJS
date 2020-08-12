/*********************************************************************
 *      model
 ********************************************************************* 
 */

/* import database */
var mongoose = require('mongoose');
var mongoDB = "mongodb://localhost:27017/LoginDB";

//ระบุ path ที่จะ connect
mongoose.connect(mongoDB, {
    useNewUrlParser: true
});

// ระบุ path ที่จะ connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB Connection Error.")); // event error 

// Create Schema
var userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String }
});

var User = module.exports = mongoose.model('User', userSchema); // ไป import ที่ router

/**
 * 
 * @param {*} newUser mongoose.mo
 * @param {*} callback 
 */
module.exports.createUser = function(newUser,callback){
    /** ข้อสังเกตุ 
     * function save จะมาจาก model schema
     */
    newUser.save(callback);
}