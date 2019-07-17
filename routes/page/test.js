var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('root', {
        layout: 'page/test',
        title: '测试',
    });
});

module.exports = router;