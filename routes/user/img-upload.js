/**
 * Created by xbh 2019-07-17
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
const conf = require('../../conf/resource');
const multiparty = require('multiparty');
router.post('/img', function (req, res, next) {
    let from = new multiparty.Form();
    let result = {
        code: 200,
        message: '',
        url: ''
    };
    from.parse(req, function (err, fields, files) {
        console.log(files);
        let newfile = files['myfile'][0];
        let filename = newfile.originalFilename;
        if (newfile) {
            if (newfile.size > conf.img_size){
                result.code = 500;
                result.message = '文件大小超过5M';
            }else {
                console.log(conf);
                fs.rename(newfile.path, conf.img_add + filename, function (e) {
                    if (e) {
                        result.code = 500;
                        result.message = '上传失败';
                    } else {
                        result.message = '上传成功';
                        result.url = conf.img_url + filename;
                    }
                    return res.json(result);
                })
            }
        }
    });
});
module.exports = router;