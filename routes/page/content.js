/**
 * Created by xbh 2019-07-19
 */
var express = require('express');
var router = express.Router();
const api = require('../../service/http-api');
const ui = require('../../views/ui/index');
router.get('/', function (req, res, next) {
    let {pageNum, pageSize} = req.query;
    if (!pageNum && !pageSize) {
        req.query.pageNum = 1;
        req.query.pageSize = 10;
    }
    api.content.list(req.query)
        .then(data => {
            let content_list_html = ui.content.contentList(data.data.contents);
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
    api.content.content(req.params.id)
        .then(data => {
            let content_info_html = ui.content.contentInfo(data.data);
            res.render('root', {
                layout: 'page/content/content-info',
                title: '专栏详情',
                content_info_html
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