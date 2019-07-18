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

router.post('/add', function (req, res, next) {
    api.type.create(req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    api.type.update(id, req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.get('/del/:id', function (req, res, next) {
    let {id} = req.params;
    api.type.delete(id)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});
module.exports = router;