var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('user/login');
});

router.use('/test', require('./page/test'));
router.use('/category', require('./page/category'));
module.exports = router;
