var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Display All Product.');
});
/**  sub url */
router.get('/add', function (req, res, next) {
    res.send('small add Product.');
});
router.get('/Add', function (req, res, next) {   /* Case insentive ->  not Show */
    res.send('Big Add2 Product.');
});

router.get('/Add/1', function (req, res, next) {
    res.send('Add 1 Product.');
});


module.exports = router;


/*
Case insentive

*/