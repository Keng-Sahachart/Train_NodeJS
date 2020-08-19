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
var LocalStrategy = require('passport-local').Strategy;

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
  failureRedirect:'/users/login',
  failureFlash:false
}), function (req, res, next) {
  res.redirect('/');
});

/**
 * login success 
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

passport.use(new LocalStrategy(function(username, password, done){
  User.getUserByName(username, function (err, user) {
    if (err) throw error
    console.log(user);
  })
}));



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
