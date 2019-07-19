/**
 * Created by xbh 2019-07-19
 */
var express = require('express');
var router = express.Router();
const api = require('../../service/http-api');
const ui = require('../../views/ui/index');
router.get('/', function (req, res, next) {
    api.content.list()
        .then(data => {
            let content_list_html = ui.content.contentList(data.data);
            res.render('root', {
                layout: 'page/content/content-list',
                title: '文章列表',
                content_list_html
            });
        })
        .catch(e => {
            console.log(e);
            res.json([]);
        })
});

router.get('/add', function (req, res, next) {
    api.content.addPage()
        .then(data => {
            let content_add_html = ui.content.contentAdd(data.data);
            res.render('root', {
                layout: 'page/content/content-add',
                title: '写文章',
                content_add_html
            });
        })
        .catch(e => {
            console.log(e);
            res.json({});
        });
});

router.get('/:id', function (req, res, next) {
    let {id} = req.params;
    api.special.detail(id)
        .then(data => {
            let special = data.data;
            let special_info_html = ui.special.specialInfo(special);
            res.render('root', {
                layout: 'page/special/special-info',
                title: '专栏详情',
                special_info_html
            });
        })
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.post('/add', function (req, res, next) {
    api.content.create(req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    api.content.update(id, req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.get('/del/:id', function (req, res, next) {
    let {id} = req.params;
    api.content.delete(id)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

module.exports = router;