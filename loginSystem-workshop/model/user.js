/*********************************************************************
 *      model
 ********************************************************************* 
 */

/* import database */
var mongoose = require('mongoose');
var mongoDB = "mongodb://localhost:27017/LoginDB";

var bcrypt = require('bcryptjs');

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
 * @param {*} newUser mongoose.model
 * @param {*} callback 
 */
module.exports.createUser = function(newUser,callback){
    /** ข้อสังเกตุ 
     * function save จะมาจาก model schema */
   // newUser.save(callback);

   /** bcryptjs แบบ Sync */
    // var salt = bcrypt.genSaltSync(10);
    // var hash = bcrypt.hashSync(newUser.password,salt);
    // var hashComp = bcrypt.compareSync(newUser.password,hash);
    // newUser.password=hash;
    // newUser.save(callback);

    /** bcryptjs แบบ ASync */
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
            // Store hash in your password DB.
        });
    });
}