/*********************************************************************
 *      model
 ********************************************************************* 
 */

//  import database
var mongoose = require('mongoose');
var mongoDB = "mongodb://localhost:27017/LoginDB";

//ระบุ path ที่จะ connect
mongoose.connect(mongoDB, {
    useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB Connection Error.")); // event error 

// Create Schema
var userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String }
});

var User = module.exports = mongoose.model('user', userSchema); // ไป import ที่ router

module.exports.createUser = function(newUSer,callback){
    newUSer.save(callback);
}