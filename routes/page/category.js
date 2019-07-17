/**
 * Created by xbh 2019-07-16
 */
var express = require('express');
var router = express.Router();
const api = require('../../service/http-api');
const ui = require('../../views/ui/index');
router.get('/', function (req, res, next) {
    api.category.list()
        .then(data => {
            console.log(data);
            let category_list_html = ui.category(data.data);
            res.render('root', {
                layout: 'page/category',
                title: '分类列表',
                category_list_html
            });
        })
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

module.exports = router;