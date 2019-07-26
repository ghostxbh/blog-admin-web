/**
 * Created by xbh 2019-07-17
 */
var express = require('express');
var router = express.Router();
const upload = require('../../service/upload-img');

router.post('/img', function (req, res, next) {
    return upload(req, res, next);
});

module.exports = router;
