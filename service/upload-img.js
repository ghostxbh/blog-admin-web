/**
 * Created by xbh 2019-07-17
 */
var fs = require('fs');
const conf = require('../conf/resource');
const multiparty = require('multiparty');

function upload(req, res, next) {
    let from = new multiparty.Form();
    return from.parse(req, function (err, fields, files) {
        let result = {success: 0, message: '', url: ''};
        if (!files) return res.json({...result, message: '没有上传文件'});
        let key = Object.keys(files)[0];
        let newfile = files[key][0];
        if (newfile.size > conf.img_size) return res.json({...result, message: '文件大于5M'});
        let filename = newfile.originalFilename;
        fs.rename(newfile.path, conf.img_add + filename, function (err) {
            if (err) return res.json({...result, message: '上传失败'});
            let url = conf.img_url + filename;
            result.success = 1;
            result.message = '上传成功';
            result.url = url;
            return res.json(result);
        });
    })
}

module.exports = upload;