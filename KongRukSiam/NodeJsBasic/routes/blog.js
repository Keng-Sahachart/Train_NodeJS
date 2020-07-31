var express = require('express');
var router = express.Router();

// import express validator
const { check, validationResult } = require('express-validator');

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
    var  errors = result.errors;
    if (!result.isEmpty()) {

        console.log(result);
        console.log({errors:errors});
       res.render("blog_form",{errors:errors})
        //return res.status(400).json({ errors: errors.array() });
    } else {

    }

});



module.exports = router;


/*
Case insentive

*/