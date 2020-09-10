var express = require('express');
var router = express.Router();

/** database */
var mongodb = require('mongodb');
var db = require('monk')('localhost:27017');

/* GET home page. */
router.get('/', function (req, res, next) {

  var blogs = db.get('posts');  // กำหนด table
  blogs.find({}, {},function(err, blog){    // เอาทุก row
    res.render('index', { posts: blog });   // ตัวแปร blog ส่งกลับไป ตัวแปรเป็น posts
  });



  // res.render('index', { title: 'Express' });
});

module.exports = router;
