var express = require('express');
var router = express.Router();

/** database */
var mongodb = require('mongodb');
const { route } = require('../app');
var db = require('monk')('localhost:27017/BlogDB');

const {body,validationResult} = require('express-validator');

/* GET home page. */
router.get('/', function (req, res, next) {
  var blogs = db.get('posts');  // กำหนด table
  blogs.find({}, {}, function (err, blog) {    // เอาทุก row
    res.render('index', { posts: blog ,title: 'Hey,this my Blog.'});   // ตัวแปร blog ส่งกลับไป ตัวแปรเป็น posts
    // res.render('index', { title: 'Express' });
  });
});

router.get('/category/add',function(req,res,next){
  res.render('addcategory',{title: 'Page Add Category'});
});

router.post('/category/add',[
  body('name','ชื่อประเภทห้ามว่าง! กรุณาใส่ชื่อประเภท.').not().isEmpty()
],function(req,res,next){
  const result = validationResult(req);
  const errors = result.errors;
  if(!result.isEmpty()){
    res.render('addcategory',{title: 'Page Add Category complete! : error',errors:errors})
  }else{
    res.render('addcategory',{title: 'Page Add Category complete!'});
  }
});


module.exports = router;
