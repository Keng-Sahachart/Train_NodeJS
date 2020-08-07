var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator');

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
  check('email', 'Please input your email.').isEmail(),
  check('name', 'pleas input your login name.').not().isEmpty(),
  check('password', 'pleas input your password.').not().isEmpty(),
  check('name', 'pleas input your login name more than 2 letter.').isLength({ min: 3 }),
  check('password', 'pleas input your password more than 2 letter.').isLength({ min: 3 })
], function (req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;


  console.log('errors =>');//,errors);

  // validate data
  if (!result.isEmpty()) {
    //return error to views
    res.render('register', { errors: errors ,title : 'register' })
  } else {
    // 
  }

  // res.render('register', { title: 'register doing' });
});

module.exports = router;
