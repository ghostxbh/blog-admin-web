var express = require('express');
var router = express.Router();

router.get('/login', function (req, res, next) {
    res.render('user/login');
});
router.use('/', require('./page/home'));
router.use('/content', require('./page/content'));
router.use('/category', require('./page/category'));
router.use('/type', require('./page/type'));
router.use('/special', require('./page/special'));
router.use('/label', require('./page/label'));
router.use('/link', require('./page/link'));
router.use('/upload', require('./user/img-upload'));

router.use('/test', require('./test'));

router.use('/sms', require('./sms'));
module.exports = router;
