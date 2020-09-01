/*********************************************************************
 *      Router
 ********************************************************************* 
 */
var express = require('express');
var router = express.Router();
var User = require('../model/user'); // import model user
const { check, validationResult } = require('express-validator');
const { enable } = require('debug');

// passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // CLASS

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'register' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'login' });
});

// ลงชื่อไม่สำเร็จ แสดงผลยังไง
// redirect กรณีที่ error
// ข้อความที่จะแสดงกลับไป// ลงชื่อเข้าใช้สำเร็จ ทำงานที่นี้
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
  failureFlash: true  // ถ้า login unsuccess ให้แสดง error result จาก passport ที่ <%- messages() %> 
}), function (req, res, next) {  

  req.flash("info", "Login Seccess Yeah!!.");
  res.redirect('/');  // sucess login 
});

/**
 * ทำเมื่อ login success 
 */
passport.serializeUser(function (user, done) {
  done(null, user.id);  //กรณี fail จะส่ง null เป็น session / success จะส่ง id มาเก็บ เป็น session
});

/**
 * หลังจาก ได้ id แล้ว เอา id มา get ข้อมูล user อีกที
 */
passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  })
});

/**
 * username,password คือ name จาก html และ บังคับต้องเป็น username เท่านั้น เพราะ LocalStrategy ต้อง destructuring จากชื่อนี้
 * 
 */
passport.use(new LocalStrategy(function (username, password, done) {
  User.getUserByName(username, function (err, user) {
    if (err) throw error

    if (!user) {// ไม่พบ user
      console.log('Login user fail' , user);
      return done(null, false);
    } else { //ถ้า มี user อยู่
      // return done(null, user);
      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw error
        if (isMatch) {
          console.log('Login user:',user.name,' Complete =>' , user);
          return done(null, user);
        } else {
          console.log('Login user:',user.name,' password fail =>' , user);
          return done(null, false);
        }
      });
    }
    console.log('Log ?' ,user);
  });
}));

router.get('/logout',function(req,res){
  req.logOut();
  res.redirect('/');
});

router.post('/register', [
  // express-validation
  check('email', 'Please input your email.').isEmail(),
  check('name', 'pleas input your login name.').not().isEmpty(),
  check('password', 'pleas input your password.').not().isEmpty()
], function (req, res, next) {
  // express-validation
  const result = validationResult(req);
  var errors = result.errors;
  // console.log('errors =>');//,errors);
  // validate data
  if (!result.isEmpty()) {
    //return error to views
    res.render('register', { errors: errors }) // ส่งข้อมูล ออกไปพร้อมกับ render
  } else {
    // 
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    //userSchema
    var newUser = new User({
      name: name,
      password: password,
      email: email
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err
    });
    res.location('/');
    res.redirect('/');
  }

  // res.render('register', { title: 'register doing' });
});

module.exports = router;
