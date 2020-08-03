var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator'); // import express validator


// import monk 
const monk = require('monk')
const url = 'localhost:27017/TutorialDB';
const db = monk(url);

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render("blog");
});

router.get('/add', function (req, res, next) {
    res.render("blog_form");
});

/**
 * req รับเข้ามา 
 * res ส่งข้อมูลกลับไป
 */
router.post('/add', [
    check('name', "Please input your blog name.").not().isEmpty(), // ไม่มี ;
    check('description', "Please input your blog description.").not().isEmpty(), // ไม่มี ;
    check('arthor', "Please input your blog arthor.").not().isEmpty() // ไม่มี ;
], function (req, res, next) {
    // console.log(req.body.name);
    // console.log(req.body.description);
    // console.log(req.body.arthor);
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {

        console.log(result);
        console.log({ errors: errors });
        res.render("blog_form", { errors: errors })
        //return res.status(400).json({ errors: errors.array() });
    } else {
        var collection = db.get('blogs');
        collection.insert({
            name: req.body.name,
            description: req.body.description,
            arthor: req.body.arthor
        }, function (err, blog) {
            if (err) {
                res.send(err);
            } else {
                req.flash("info", "บันทึก เรียบร้อยแล้ว");  
                req.flash("error", "TEst class error");  
                /* สั่งให้ messages() แสดงผล ข้อความ class error และ ข้อความตามนี้ แต่จะใช้ session ในการส่งไปด้วย
                    สามารถสั่งให้ แสดงได้หลาย ข้อความ
                */
                res.location("/blog/add");
                res.redirect("/blog/add");
            }
        });
    }

});



module.exports = router;


/*
Case insentive

*/