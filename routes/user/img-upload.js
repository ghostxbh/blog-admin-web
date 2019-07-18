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
    from.parse(req, function (err, fields, files) {
        console.log(files);
        let newfile = files['myfile'][0];
        let filename = newfile.originalFilename;
        fs.renameSync(newfile.path, conf.img_add + filename);
    });
});

module.exports = router;
