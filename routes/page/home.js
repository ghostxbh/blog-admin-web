/**
 * Created by xbh 2019-07-21
 */
var express = require('express');
var router = express.Router();
const api = require('../../service/http-api');
const ui = require('../../views/ui/index');

router.get('/', function (req, res, next) {
    let home_html = ui.home();
    res.render('root', {
        layout: 'page/home',
        title: '首页',
        home_html
    });
});

module.exports = router;