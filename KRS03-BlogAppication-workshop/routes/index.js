var express = require('express');
var router = express.Router();
var moment = require('moment');

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
      res.render('index', {
        posts: blog,
        categories: category,
        moment: moment,
        title: 'Hey,this my Blog.'
      });   // ตัวแปร blog ส่งกลับไป ตัวแปรเป็น posts
    });
  });
});

/***************************************************
      Category  
 ***************************************************/
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

/***************************************************
      Blog  
 ***************************************************/
router.get('/blog/add', function (req, res, next) {
  const categories = db.get('categories');
  categories.find({}, {}, (err, categories) => {
    res.render('addNewBlog', {
      title: 'Page Add new Blogs',
      categories: categories
    });
  });
});

router.get('/show/:id', async function (req, res, next) {
  let categories = db.get('categories');
  let posts = db.get('posts');

  let categoryOut = await categories.find({}, {}
    , function (err, categories) {
      console.log('Query categories Error ->', err);
    });

  let postOut = await posts.findOne({ _id: req.params.id }, {}
    , function (err, post) {
      console.log('Query categories Error ->', err);
    });

  console.log(postOut);
  res.render('showBlog', {
    title: 'Page Show Blog ',
    categories: categoryOut,
    post: postOut,
    moment: moment
  });

});

router.post('/blog/add', [
  body('title', 'ชื่อบทความ ห้ามว่าง').not().isEmpty(),
  body('img', 'รูปปก ห้ามว่าง').not().isEmpty(),
  body('content', 'เนื้อหา ห้ามว่าง').not().isEmpty(),
  body('author', 'ผู้เขียน ห้ามว่าง').not().isEmpty()
], async function (req, res, next) {
  const result = validationResult(req);
  const errors = result.errors;

  let categories = db.get('categories');
  let posts = db.get('posts');

  let categoryOut = categories.find({}, {}
    , function (err, categories) {
      console.log('Query categories Error ->', err);
    });
  console.log('Query categories OK ->', categoryOut);

  if (!result.isEmpty()) {
    res.render('addNewBlog', {
      title: 'Page Add new Blogs : error',
      errors: errors,
      categories: categoryOut
    });
  } else {
    // Insert record
    posts.insert({
      title: req.body.title,
      content: req.body.content,
      img: req.body.img,
      author: req.body.author,
      category: req.body.category,
      date: new Date()
    }, (err, success) => {
      if (err) {
        res.send(err);
      } else {
        res.location('/');
        res.redirect('/');
      }
    });
  }


});
/************************************************************************ */
module.exports = router;
