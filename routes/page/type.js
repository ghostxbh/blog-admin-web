/**
 * Created by xbh 2019-07-16
 */
var express = require('express');
var router = express.Router();
const api = require('../../service/http-api');
const ui = require('../../views/ui/index');
router.get('/', function (req, res, next) {
    let {pageNum, pageSize} = req.query;
    if (!pageNum && !pageSize) {
        pageNum = 1;
        pageSize = 10;
    }
    api.type.list(pageNum, pageSize)
        .then(data => {
            let type_list_html = ui.type(data.data);
            res.render('root', {
                layout: 'page/type',
                title: '文章类型',
                type_list_html
            });
        })
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

module.exports = router;