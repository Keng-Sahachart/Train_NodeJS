var express = require('express');
var router = express.Router();

/** database */
var mongodb = require('mongodb');
const { route } = require('../app');
var db = require('monk')('localhost:27017/BlogDB');

const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function (req, res, next) {
  var blogs = db.get('posts');  // กำหนด table
  var categories = db.get('categories');
  blogs.find({}, {}, function (err, blog) {    // เอาทุก row
    categories.find({}, {}, function (err, category) {
      res.render('index', { posts: blog, categories: category, title: 'Hey,this my Blog.' });   // ตัวแปร blog ส่งกลับไป ตัวแปรเป็น posts
    });
  });
});

router.get('/category/add', function (req, res, next) {
  res.render('addcategory', { title: 'Page Add Category' });
});

router.post('/category/add', [
  body('name', 'ชื่อประเภทห้ามว่าง! กรุณาใส่ชื่อประเภท.').not().isEmpty()
], function (req, res, next) {
  const result = validationResult(req);
  const errors = result.errors;
  if (!result.isEmpty()) {
    res.render('addCategory', { title: 'Page Add Category complete! : error', errors: errors })
  } else {
    // บันทึก
    var category = db.get('categories');  // กำหนด table ใน database 
    console.log(req.body.name);
    category.insert({
      name: req.body.name
    }, function (err, success) {
      if (err) {
        res.send(err);
      } else {
        res.location('/');   // redirecไปที่หน้า แรก
        res.redirect('/');
      }
    });
    // res.render('addcategory',{title: 'Page Add Category complete!'});
  }
});

router.get('/blog/add', function (req, res, next) {
  res.render('addBlog', { title: 'Page Add Blog' });
});


module.exports = router;
