/**
 * Created by xbh 2019-07-17
 */
var express = require('express');
var router = express.Router();

router.post('/img', function (req, res, next) {
    let files = req.upfile;
    var result = {};
    if (!files[0]) {
        result.code = 1;
        result.errMsg = '上传失败';
    } else {
        result.code = 0;
        result.data = {
            url: files[0].path
        };
        result.errMsg = '上传成功';
    }
    res.json(result);
});
module.exports = router;