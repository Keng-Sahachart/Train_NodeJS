/*********************************************************************
 *      Router
 ********************************************************************* 
 */
var express = require('express');
var router = express.Router();
var User = require('../model/user'); // import model user
const { check, validationResult } = require('express-validator');
const { enable } = require('debug');

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
    // var name = req.body.name;
    // var password = req.body, password;
    // var email = req.body.email;

    // //userSchema
    // var newUser = new User({
    //   name: name,
    //   password: password,
    //   email: email
    // });

    // User.createUser(newUser, function (err, user) {
    //   if (err) throw err
    // });
    // res.location('/');
    // res.redirect('/');
  }

  // res.render('register', { title: 'register doing' });
});

module.exports = router;
